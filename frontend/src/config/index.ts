interface Option {
  id: string;
  label: string;
  hex?: string;
  categories?: Array<{ id: string; label: string }>;
}

export interface FormControlBase {
  name: string;
  label: string;
  placeholder?: string;
  relatedWith?: string;
  isRequired: boolean,
  componentType: "input" | "textarea" | "select" | "te" | "toggleGroup" | 'selectbyId' | 'upload';
  type?: 'text' | 'email' | 'password' | 'number'
  options?: Option[]
}

export interface IAddProductFormElements {
  label: string,
  name: string,
  componentType: string,
  items: FormControlBase[]
}
export const registerFormControls: FormControlBase[] = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    isRequired: true,
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    isRequired: true,
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    isRequired: true,
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls: FormControlBase[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    isRequired: true,
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    isRequired: true,
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements: IAddProductFormElements[] = [
  {
    label: "Add Product Photo",
    name: "productPhotos",
    componentType: "uploadPhoto",
    items: [
      {
        label: "Add Product Photo",
        name: "images",
        componentType: "upload",
        isRequired: true,
        placeholder: "Upload product photo",
      },
    ]
  },

  {
    label: "Product Information",
    name: "productInfo",
    componentType: "sectionLabel",
    items: [
      {
        label: "Title",
        name: "title",
        componentType: "input",
        isRequired: true,
        type: "text",
        placeholder: "Enter product title",
      },
      {
        label: "Short Description",
        name: "shortDescription",
        componentType: "input",
        isRequired: true,
        type: "text",
        placeholder: "Enter a short product description",
      },
      {
        label: "Description",
        name: "description",
        componentType: "textarea",
        isRequired: true,
        placeholder: "Enter product description",
      },
      {
        label: "Audience",
        name: "audience",
        componentType: "select",
        isRequired: true,
        placeholder: "---",
        options: [
          { id: "men", label: "Men" },
          { id: "women", label: "Women" },
          { id: "kids", label: "Kids" },
        ],
      },
      {
        label: "Category",
        name: "category",
        componentType: "selectbyId",
        isRequired: true,
        placeholder: "---",
        relatedWith: "audience",
        options: [
          {
            id: "men",
            label: "Men",
            categories: [
              { id: "t-shirts-polos", label: "T-Shirts & Polos" },
              { id: "shirts", label: "Shirts" },
              { id: "jeans-trousers", label: "Jeans & Trousers" },
              { id: "jackets-coats", label: "Jackets & Coats" },
              { id: "sweaters-hoodies", label: "Sweaters & Hoodies" },
              { id: "activewear-sportswear", label: "Activewear & Sportswear" },
              { id: "shorts", label: "Shorts" },
              { id: "shoes-sneakers", label: "Shoes & Sneakers" },
              { id: "accessories", label: "Accessories" },
            ],
          },
          {
            id: "women",
            label: "Women",
            categories: [
              { id: "dresses", label: "Dresses" },
              { id: "tops-blouses", label: "Tops & Blouses" },
              { id: "skirts-pants", label: "Skirts & Pants" },
              { id: "outerwear-jackets", label: "Outerwear & Jackets" },
              { id: "sweaters-cardigans", label: "Sweaters & Cardigans" },
              { id: "activewear-sportswear", label: "Activewear & Sportswear" },
              { id: "shoes-sandals", label: "Shoes & Sandals" },
              { id: "accessories", label: "Accessories" },
            ],
          },
          {
            id: "kids",
            label: "Kids",
            categories: [
              { id: "tops-t-shirts", label: "Tops & T-Shirts" },
              { id: "pants-shorts", label: "Pants & Shorts" },
              { id: "dresses-skirts", label: "Dresses & Skirts" },
              { id: "outerwear-jackets", label: "Outerwear & Jackets" },
              { id: "activewear-sportswear", label: "Activewear & Sportswear" },
              { id: "sleepwear-pajamas", label: "Sleepwear & Pajamas" },
              { id: "shoes-sneakers", label: "Shoes & Sneakers" },
              { id: "accessories", label: "Accessories" },
            ],
          },
        ],
      },
      {
        label: "Brands",
        name: "brands",
        componentType: "select",
        isRequired: true,
        placeholder: "---",
        options: [
          { id: "nike", label: "Nike" },
          { id: "adidas", label: "Adidas" },
          { id: "puma", label: "Puma" },
          { id: "levi", label: "Levi's" },
          { id: "zara", label: "Zara" },
          { id: "h&m", label: "H&M" },
        ],
      },
      {
        label: "Size",
        name: "sizes",
        componentType: "toggleGroup",
        isRequired: false,
        options: [
          { id: "XS", label: "XS" },
          { id: "S", label: "S" },
          { id: "M", label: "M" },
          { id: "XL", label: "XL" },
          { id: "2XL", label: "2XL" },
          { id: "3XL", label: "3XL" },
        ],
      },
      {
        label: "Colors",
        name: "colors",
        componentType: "toggleGroup",
        isRequired: false,
        options: [
          { id: "Red", label: "Red", hex: "#FF0000" },
          { id: "Blue", label: "Blue", hex: "#0000FF" },
          { id: "Green", label: "Green", hex: "#00FF00" },
          { id: "Yellow", label: "Yellow", hex: "#FFFF00" },
          { id: "Black", label: "Black", hex: "#000000" },
          { id: "White", label: "White", hex: "#FFFFFF" },
          { id: "Purple", label: "Purple", hex: "#800080" },
          { id: "Orange", label: "Orange", hex: "#FFA500" },
          { id: "Pink", label: "Pink", hex: "#FFC0CB" },
          { id: "Brown", label: "Brown", hex: "#A52A2A" },
        ],
      }

    ]
  },

  {
    label: "Pricing Details",
    name: "pricingDetails",
    componentType: "sectionLabel",
    items: [
      {
        label: "Price",
        name: "price",
        componentType: "input",
        isRequired: true,
        type: "number",
        placeholder: "Enter product price",
      },
      {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        isRequired: false,
        type: "number",
        placeholder: "Enter sale price (optional)",
      },
      {
        label: "Total Stock",
        name: "quantity",
        componentType: "input",
        isRequired: true,
        type: "number",
        placeholder: "Enter total stock",
      },

    ]
  },
]