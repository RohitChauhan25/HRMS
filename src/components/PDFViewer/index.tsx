import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import PropTypes from 'prop-types'
import { useGetAsArraybuffer } from 'hooks/useGet'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDFViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfData, setPdfData] = useState<Blob | null>(null)
  const { data: PDFArrayBuffer, refetch: refetchPDF } = useGetAsArraybuffer('getPDF', url, { token: false })
  useEffect(() => {
    refetchPDF()
  }, [])

  useEffect(() => {
    const intitialisePDFData = () => {
      const data = new Uint8Array(PDFArrayBuffer)
      const blob = new Blob([data], { type: 'application/pdf' })
      setPdfData(blob)
    }

    intitialisePDFData()
  }, [PDFArrayBuffer])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const onPageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber)
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNextPage = () => {
    if (numPages !== null && pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const renderPagination = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          &lt;
        </button>
        &nbsp;
        <span>
          Page {pageNumber} of {numPages}
        </span>
        &nbsp;
        <button onClick={handleNextPage} disabled={pageNumber === numPages}>
          &gt;
        </button>
      </div>
    )
  }

  const renderPages = () => {
    const pages = []
    pages.push(
      <Page key={`page_${pageNumber}`} pageNumber={pageNumber} onLoadSuccess={() => onPageChange(pageNumber)} />,
    )
    return pages
  }

  return (
    <div>
      {pdfData && (
        <>
          {numPages > 1 && renderPagination()}
          <div style={{ marginTop: '15px', border: numPages > 0 ? '1px solid' : '' }}>
            <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
              {renderPages()}
            </Document>
          </div>
        </>
      )}
    </div>
  )
}

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PDFViewer
