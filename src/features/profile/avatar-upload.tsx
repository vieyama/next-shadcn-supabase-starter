import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface AvatarUploadProps {
  initialImage?: string;
  onUpload?: (_file: File) => Promise<File | null>;
}

export default function AvatarUpload({ initialImage, onUpload }: AvatarUploadProps) {
  const [preview, setPreview] = useState(initialImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const uploadedFile = onUpload?.(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    if(uploadedFile) {
      reader.readAsDataURL(file);
    }

  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <Avatar className="h-28 w-28 border-4 border-background shadow-md transition-transform group-hover:scale-105">
        <AvatarImage src={preview} alt="Profile" />
        <AvatarFallback className="text-2xl">JD</AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Upload className="h-6 w-6 text-white" />
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}