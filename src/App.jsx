import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="container">
      <h3>Test React-PDF to view PDF file in-app website ReactJs</h3>
      <div className="pdf-container">
        <Button type="primary" onClick={showModal}>
          View PDF file
        </Button>
        <Modal
          title="PDF File"
          open={isModalOpen}
          onOk={handleOk}
          okText={"Download"}
          onCancel={handleCancel}
        >
          <Document
            file="document.pdf"
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
            <div className="wrap-btns">
              <button
                onClick={handlePrevPage}
                className={pageNumber <= 1 ? `btn-paginate-disabled` : null}
              >
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </button>
              <span className="page-number">
                Page {pageNumber}/{numPages}
              </span>
              <button
                onClick={handleNextPage}
                className={
                  pageNumber >= numPages ? `btn-paginate-disabled` : null
                }
              >
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </button>
            </div>
          </Document>
        </Modal>
      </div>
    </div>
  );
}

export default App;
