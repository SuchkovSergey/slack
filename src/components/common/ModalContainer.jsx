import React from 'react';
import i18next from 'i18next';

const ModalContainer = ({ titleKey, onHide, children }) => (
  <div
    className="modal fade show"
    role="dialog"
    style={{ display: 'block' }}
    centered="true"
  >
    <div className="modal-overlay" />
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4
            className="modal-title"
            dangerouslySetInnerHTML={{ __html: i18next.t(titleKey) }}
          />
          <button
            onClick={onHide}
            type="button"
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default ModalContainer;
