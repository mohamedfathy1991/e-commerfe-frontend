import React, { useState } from "react";
import style from './brands.module.css'


export default function Branddetails({ brands }) {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  return (
    <>
      <div className=" col-3 g-4">
        <div className={`text-center product card ${style.brand}`}>
          <img onClick={() => setShowModal(true)} className="w-100" src={brands.image} />
          <h5 className="text-center my-4">{brands.slug}</h5>
        </div>
      </div>
      {showModal && ( // Render modal conditionally based on state
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{brands.slug}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img  width={350} height={350} src={brands.image}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
