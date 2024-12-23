import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '@/assets/logo.png'; 

const generatePDF = (orders) => {
  const doc = new jsPDF();
 
  doc.setFont('helvetica');

  doc.addImage(logo, 'PNG', 10, 10, 15, 7); 
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0); 
  doc.text('Listado de Pedidos', 30, 15); 

  const tableColumn = ['ID Pedido', 'Fecha', 'Estado', 'Total'];
  const tableRows = orders.map(order => [
    order.id,
    new Date(order.created_at).toLocaleDateString(),
    order.estado.toUpperCase(),
    `$${order.total} USD`
  ]);
  
  doc.autoTable({
    startY: 30, 
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 128, 0], 
      textColor: 255,
      fontSize: 12, 
      halign: 'center'
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' }
    },
    margin: { right: 10, left: 10 }, 
  });
  
  doc.save('Listado_Pedidos.pdf');
};

export default generatePDF;