import React, { useState } from "react";
import WasteTree from "./WasteTree";
import "./WasteTreeModal.scss";

type Props = {
  open: boolean;
  onClose?: () => void;
  onSelect?: (value: any) => void;
};

export default function({
  open = false,
  onClose = () => null,
  onSelect = () => null
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <div
      className="modal__backdrop"
      style={{ display: open ? "flex" : "none" }}
    >
      <div className="modal modal-large">
        <WasteTree onSelect={keys => setSelectedKeys(keys)} />
        <div>
          <p>
            Vous aller sélectionner le(s) code(s): {selectedKeys.join(", ")}
          </p>
          <button
            className="button secondary"
            type="button"
            onClick={() => onClose()}
          >
            Annuler
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              onSelect(selectedKeys);
              onClose();
            }}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}