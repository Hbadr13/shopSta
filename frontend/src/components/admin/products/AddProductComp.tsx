import CommonForm from "@/components/common/CommonForm"
import { addProductFormElements } from "@/config"
import ProductDisplayWhenCreated from "./ProductDisplayWhenCreated";
import { IInitialFormDataProps } from "@/app/admin/products/add/page";
import { useRouter } from "next/navigation";



interface IAddProductCompProps {
    formData: IInitialFormDataProps
    setFormData: (formData: IInitialFormDataProps) => void
    hendelAddProcut: () => void
    selectedImages: File[]
    setSelectedImages: (selectedImages: File[]) => void
}
const AddProductComp = ({ formData, setFormData, hendelAddProcut, selectedImages, setSelectedImages }: IAddProductCompProps) => {
    const route = useRouter()

    return (
        <div className="flex gap-5 relative">
            <div className=" inse w-[40%] relative  ">
                <div className=" sticky top-4 bg-white p-6 rounded-xl  shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12)]">
                    <ProductDisplayWhenCreated selectedImages={selectedImages} setSelectedImages={setSelectedImages} formData={formData} setFormData={setFormData} />
                </div>
            </div>

            <div className=" w-[60%] rounded-xl gap-5 space-y-5">
                {
                    addProductFormElements.map((section, index) =>
                        <div key={index} className=" bg-white rounded-xl shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12)]">
                            <div className="border-b-[1px] px-6 py-4 font-semibold">{section.label}</div>
                            <div className="p-6 space-y-3">
                                {
                                    section.items.map((item, index) => <CommonForm selectedImages={selectedImages} setSelectedImages={setSelectedImages}
                                        key={index} controlItem={item} formData={formData} setFormData={setFormData} />)
                                }
                            </div>
                        </div>)
                }
                <div className=" bg-slate-200/55 rounded-xl -shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12)]">
                    <div className="py-6 pr-10 space-x-6 flex items-center justify-end">
                        <button onClick={() => route.push('/admin/dashboard')} className="active:opacity-60 transition-all duration-200 font-semibold text-eco-orange-v0 border-eco-orange-v0 border-2 rounded-2xl px-6 py-3 hover:scale-[102%] duration-200">
                            Cancel
                        </button>
                        <button onClick={hendelAddProcut} className="active:opacity-60 transition-all duration-200 bg-eco-blue-v0 rounded-2xl  px-4 py-3 duration-300  font-semibold text-white hover:bg-slate-200/55 hover:scale-[102%] border-2 border-eco-blue-v0  hover:text-eco-blue-v0">
                            Create Product
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProductComp