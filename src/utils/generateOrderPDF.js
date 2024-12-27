import jsPDF from 'jspdf';
import logo from '@/assets/logo.png';

const generatePDF = (orders) => {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.addImage(logo, 'PNG', 10, 10, 15, 7);
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0);
  doc.text('Listado de Pedidos', 30, 15);

  const margin = 10;
  let yPosition = 30;
  const pageHeight = doc.internal.pageSize.height;
  const cardWidth = 190;

  orders.forEach((order) => {
    const headerHeight = 15;
    const productosEstaticos = [
      { nombre: 'Producto 1', precio: 10, cantidad: 2 },
      { nombre: 'Producto 2', precio: 15, cantidad: 1 },
      { nombre: 'Producto 3', precio: 20, cantidad: 3 }
    ];

    // Calculate dynamic card height
    const baseHeight = headerHeight + 90; // Header + Remitente + Destinatario sections
    const productsHeight = (productosEstaticos.length + 2) * 10; // Products + header + total row
    const cardHeight = baseHeight + productsHeight;

    doc.setFillColor(255, 255, 255);
    doc.rect(margin, yPosition, cardWidth, cardHeight, 'FD');

    doc.setFillColor(0, 128, 0);
    doc.rect(margin, yPosition, cardWidth, headerHeight, 'FD');

    doc.setTextColor(255);
    doc.setFontSize(12);
    doc.text(`ID Pedido: ${order.id}`, margin + 5, yPosition + 10);
    doc.text(`Fecha: ${new Date(order.created_at).toLocaleDateString()}`, margin + cardWidth - 50, yPosition + 10);

    const dataYPosition = yPosition + headerHeight + 5;

    doc.setTextColor(0);
    doc.text('Remitente:', margin + 5, dataYPosition);
    doc.text(`Telefono: ${order.usuario.telefono}`, margin + cardWidth / 2 + 5, dataYPosition);

    const destinatarioYPosition = dataYPosition + 5;
    
    doc.text(`Destinatario: ${order.destinatario.nombre}`, margin + 5, destinatarioYPosition + 10);
    doc.text(`Provincia: ${order.destinatario.provincia}`, margin + 5, destinatarioYPosition + 20);
    doc.text(`Dirección: ${order.destinatario.direccion}`, margin + 5, destinatarioYPosition + 30);
    doc.text(`Teléfono Fijo: ${order.destinatario.telefono_fijo}`, margin + 5, destinatarioYPosition + 40);

    doc.text(`CI: ${order.destinatario.ci}`, margin + cardWidth / 2 + 5, destinatarioYPosition + 10);
    doc.text(`Municipio: ${order.destinatario.municipio}`, margin + cardWidth / 2 + 5, destinatarioYPosition + 20);
    doc.text(`Número de Casa: ${order.destinatario.numero_casa}`, margin + cardWidth / 2 + 5, destinatarioYPosition + 30);
    doc.text(`Teléfono Móvil: ${order.destinatario.telefono_celular}`, margin + cardWidth / 2 + 5, destinatarioYPosition + 40);

    const productosYPosition = destinatarioYPosition + 45;

    doc.setFillColor(0, 128, 0);
    doc.rect(margin, productosYPosition, cardWidth, 10, 'FD');
    doc.setTextColor(255);
    doc.text('Producto', margin + 5, productosYPosition + 7);
    doc.text('Precio', margin + 120, productosYPosition + 7);
    doc.text('Cantidad', margin + 160, productosYPosition + 7);

    doc.setTextColor(0);
    doc.setDrawColor(0);

    productosEstaticos.forEach((producto, index) => {
      const productLineY = productosYPosition + 15 + (index * 10);
      
      if (index % 2 === 0) {
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, productLineY - 5, cardWidth, 10, 'FD');
      }
      
      doc.text(`${producto.nombre}`, margin + 5, productLineY);
      doc.text(`$${producto.precio}`, margin + 120, productLineY);
      doc.text(`${producto.cantidad}`, margin + 160, productLineY);
      doc.line(margin, productLineY + 5, margin + cardWidth, productLineY + 5);
    });

    const total = productosEstaticos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const totalYPosition = productosYPosition + 15 + (productosEstaticos.length * 10);
    
    doc.setFillColor(230, 230, 230);
    doc.rect(margin, totalYPosition - 5, cardWidth, 10, 'FD');
    doc.line(margin, totalYPosition + 5, margin + cardWidth, totalYPosition + 5);
    doc.text(`Total a Pagar: $${total} USD`, margin + 5, totalYPosition);

    if (yPosition + cardHeight > pageHeight) {
      doc.addPage();
      yPosition = 30;
      doc.addImage(logo, 'PNG', 10, 10, 15, 7);
      doc.setFontSize(14);
      doc.setTextColor(0, 128, 0);
      doc.text('Listado de Pedidos', 30, 15);
    }

    yPosition += cardHeight + margin;
  });

  doc.save('Listado_Pedidos.pdf');
};

export default generatePDF;