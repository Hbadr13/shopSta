import 'jspdf-autotable';

declare module 'jspdf-autotable' {
    interface AutoTable {
        previous: {
            finalY: number;
        };
    }

    interface jsPDF {
        autoTable: (options: any) => jsPDF & { previous: { finalY: number } };
    }
}