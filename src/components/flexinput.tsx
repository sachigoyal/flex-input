"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowUp, Loader2, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z.string().optional(),
});

export function FlexInput() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Implement submit logic here
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(values.text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    const items = event.clipboardData.items;
    const newImages: string[] = [];

    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) {
          const imageURL = URL.createObjectURL(file);
          newImages.push(imageURL);
        }
      }
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const imageURLs = imageFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageURLs]);
    }
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragLeave() {
    setIsDragging(false);
  }
  function handleFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const imageURLs = imageFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageURLs]);
    }
    event.target.value = "";
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  function previewImage(index: number) {
    return () => {
      setSelectedImage(images[index]);
      setIsDialogOpen(true);
    };
  }

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl mx-auto border rounded-lg p-1",
        isDragging && "border-dashed"
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      {images.length > 0 && (
        <ScrollArea>
          <div className="flex flex-wrap gap-3 p-1 max-h-[150px]">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative size-[120px] cursor-pointer rounded-md overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`image ${index + 1}`}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                  onClick={previewImage(index)}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="focus-visible:ring-0 absolute top-1 right-1 h-5 w-5 cursor-pointer rounded-full p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex items-end"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleFileSelect}
            className="focus-visible:ring-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full min-h-9">
                <FormControl>
                  <Textarea
                    autoFocus
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    className="resize-none focus-visible:ring-0 border-none min-h-9 shadow-none px-1"
                    rows={1}
                    placeholder="Enter your prompt here"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={isSubmitting || form.watch("text")?.trim() === ""}
            className="focus-visible:ring-0 disabled:!pointer-events-auto disabled:!cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          onClick={() => setIsDialogOpen(false)}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-screen h-screen border-none rounded-none bg-black/30 overflow-hidden"
        >
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Preview"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
