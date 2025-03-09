import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

interface IImageUploadProps {
    setSelectedImages: (selectedImages: File[]) => void
    selectedImages: File[]
}
const ImageUpload = ({ setSelectedImages, selectedImages }: IImageUploadProps) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setSelectedImages([...selectedImages, acceptedFiles[0]])
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center border-2 rounded-lg p-4 transition ${isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
        >
            <input {...getInputProps()} />

            <div className="text-center flex flex-col items-center p-5 space-y-3">
                <FiUploadCloud className="text-eco-orange-v0 w-10 h-10" />
                <p className="text-gray-700 text-2xl font-semibold">
                    {isDragActive ? (
                        <span>Drop your images here...</span>
                    ) : (
                        <span>
                            Drop your images here, or{" "}
                            <span className="text-eco-orange-v0">click to browse</span>
                        </span>
                    )}
                </p>
                <p className="text-gray-500 text-xs">
                    1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
                </p>
                <p className="text-gray-500 text-xs">
                    Maximum number of images is <span className="text-eco-orange-v0 font-semibold">8</span>.
                </p>
            </div>
        </div>
    );
};

export default ImageUpload;
