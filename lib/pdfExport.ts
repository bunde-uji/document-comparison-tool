import jspdf from 'jspdf';
import domtoimage from 'dom-to-image-more';

// In lib/pdfExport.ts
export async function exportDiffToPDF(
  elementId: string,
  filename: string = 'document-comparison.pdf'
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const dataUrl = await domtoimage.toPng(element, {
      quality: 0.95,
      bgcolor: '#ffffff',
    });

    const pdf = new jspdf('p', 'mm', 'a4');
    
    // Add metadata
    pdf.setProperties({
      title: 'Document Comparison Report',
      subject: 'Policy Diff Analysis',
      author: 'Privacy Policy Diff Tool',
      keywords: 'comparison, diff, policy',
      creator: 'Privacy Policy Diff Tool'
    });
    
    const imgWidth = 210;
    const pageHeight = 297;
    
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const imgHeight = (img.height * imgWidth) / img.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

export function generatePDFFilename(oldText: string, newText: string): string {
  const timestamp = new Date().toISOString().split('T')[0];
  const preview = oldText.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '-');
  return `comparison-${preview}-${timestamp}.pdf`;
}