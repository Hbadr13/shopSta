import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IApiProducts } from '@/interface/IApiProducts'
import Link from "next/link";

const Tablesv1 = ({ productList }: { productList: IApiProducts }) => {
    return (
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow className="bg-gray-100 text-gray-600">
                    <TableHead className="px-4 py-2 text-left">Product</TableHead>
                    <TableHead className="px-4 py-2 text-left">Product ID</TableHead>
                    <TableHead className="px-4 py-2 text-left">Price</TableHead>
                    <TableHead className="px-4 py-2 text-right">Stock</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {productList.products.map((invoice) => (
                    <TableRow className="border-t hover:bg-gray-50" key={invoice._id}>
                        <TableCell className="px-4 py-3 text-blue-600 font-medium hover:text-blue-500 duration-200">
                            <Link href={'#'}>
                                {invoice.title}
                            </Link>
                        </TableCell>
                        <TableCell className="px-4 py-3">{invoice._id}</TableCell>
                        <TableCell className="px-4 py-3">{invoice.price}</TableCell>
                        <TableCell className="px-4 py-3 text-right">{invoice.quantity}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-gray-100">
                    <TableCell colSpan={3} className="px-4 py-3 font-bold text-gray-700">Total</TableCell>
                    <TableCell className="px-4 py-3 text-right text-green-600 font-bold">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default Tablesv1;


// const Tablesv1 = () => {
//     const [sorting, setSorting] = React.useState<SortingState>([])
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//         []
//     )
//     const [columnVisibility, setColumnVisibility] =
//         React.useState<VisibilityState>({})
//     const [rowSelection, setRowSelection] = React.useState({})

//     const table = useReactTable({
//         data,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     })

//     return (
//         <div className="w-full">
//             <div className="flex items-center py-4">
//                 <Input
//                     placeholder="Filter emails..."
//                     value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//                     onChange={(event) =>
//                         table.getColumn("email")?.setFilterValue(event.target.value)
//                     }
//                     className="max-w-sm"
//                 />
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="ml-auto">
//                             Columns <ChevronDown />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         {table
//                             .getAllColumns()
//                             .filter((column) => column.getCanHide())
//                             .map((column) => {
//                                 return (
//                                     <DropdownMenuCheckboxItem
//                                         key={column.id}
//                                         className="capitalize"
//                                         checked={column.getIsVisible()}
//                                         onCheckedChange={(value) =>
//                                             column.toggleVisibility(!!value)
//                                         }
//                                     >
//                                         {column.id}
//                                     </DropdownMenuCheckboxItem>
//                                 )
//                             })}
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <TableHead key={header.id}>
//                                             {header.isPlaceholder
//                                                 ? null
//                                                 : flexRender(
//                                                     header.column.columnDef.header,
//                                                     header.getContext()
//                                                 )}
//                                         </TableHead>
//                                     )
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={row.getIsSelected() && "selected"}
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell
//                                     colSpan={columns.length}
//                                     className="h-24 text-center"
//                                 >
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4">
//                 <div className="flex-1 text-sm text-muted-foreground">
//                     {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                     {table.getFilteredRowModel().rows.length} row(s) selected.
//                 </div>
//                 <div className="space-x-2">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                     >
//                         Previous
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}
//                     >
//                         Next
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Tablesv1
