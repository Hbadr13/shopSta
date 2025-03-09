
import { FormControlBase } from '@/config'
import { ReactNode } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import ImageUpload from '../admin/products/ImageUpload'
import { IInitialFormDataProps } from '@/app/admin/products/add/page'
interface ICommonFormProps {
    controlItem: FormControlBase,
    formData: IInitialFormDataProps
    setFormData: (formData: IInitialFormDataProps) => void
    setSelectedImages?: (selectedImages: File[]) => void
    selectedImages?: File[]

}

const CommonForm = ({ controlItem, formData, setFormData, selectedImages, setSelectedImages }: ICommonFormProps) => {
    const renderInputsByComponentType = (controlItem: FormControlBase) => {
        let element: ReactNode | null = null
        const value = formData[controlItem.name] || "";
        switch (controlItem.componentType) {
            case 'input':
                element = element = (
                    <Input className=" placeholder:text-gray-400  px-3 py-6  border-[1px] rounded-xl  focus-visible:ring-offset-0 focus-visible:ring-0"
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break

            case 'select':
                element = (<Select
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            [controlItem.name]: value,
                            category: controlItem.relatedWith ? '' : formData.category
                        })
                    }
                    value={typeof value == 'string' ? value : value[0]}
                >
                    <SelectTrigger className={`w-full px-3 py-6  border-[1px] rounded-xl  ${!value ? 'text-gray-400' : ''} `}>
                        <SelectValue placeholder={controlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{controlItem.label}</SelectLabel>
                            {controlItem.options && controlItem.options.length > 0
                                ? controlItem.options.map((optionItem) => (
                                    <SelectItem className='' key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectGroup>
                    </SelectContent>
                </Select>)
                break
            case 'selectbyId':
                element = (<Select
                    disabled={!formData.audience}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            [controlItem.name]: value,
                        })
                    }
                    value={typeof value == 'string' ? value : value[0]}
                >
                    <SelectTrigger className={`w-full px-3 py-6  border-[1px] rounded-xl  ${!value ? 'text-gray-400' : ''} `}>
                        <SelectValue placeholder={controlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{controlItem.label}</SelectLabel>
                            {controlItem.options && formData.audience
                                ? controlItem.options.find((it) => it.id == formData.audience)?.categories?.map((optionItem) => (
                                    <SelectItem className='' key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectGroup>
                    </SelectContent>
                </Select>)
                break
            case 'textarea':
                element = (
                    <Textarea
                        className='placeholder:text-gray-400 rounded-xl'
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break
            case "toggleGroup":
                element = (
                    <ToggleGroup onValueChange={(it) => setFormData({ ...formData, [controlItem.name]: it })} variant="outline" type="multiple">
                        {
                            controlItem.options?.map((item) => (
                                <ToggleGroupItem style={{ backgroundColor: formData[controlItem.name].indexOf(item.id) == -1 ? `${item.hex}35` : '', }} key={item.id} value={item.id} aria-label="Toggle bold">
                                    <div>{item.label}</div>
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                )
                break;
            case 'upload':
                element = setSelectedImages && selectedImages ? <ImageUpload setSelectedImages={setSelectedImages} selectedImages={selectedImages} /> : <div></div>
                break
            default:
                element = <div className="">NONE</div>
                break
        }
        return element
    }

    return (
        <div className='space-y-0.5'>
            <div className="font-medium  text-sm pl-1">
                {controlItem.label}
                {controlItem.isRequired && <span className='text-red-400 font-semibold text-sm'>*</span>}
            </div>
            <div className="font-medium">
                {renderInputsByComponentType(controlItem)}
            </div>
        </div>
    )
}

export default CommonForm