import { Reducer } from "react";

import { ModalType } from "../components/InformationModal";

import { checkEnumExhausted } from "../services/constants-types";
import { ModalOp, ModalConfiguration, ModalAction } from "./modal-types.d";

type ModalInfoOp =
  | ModalOp.OPEN_SUCCESS_MODAL
  | ModalOp.OPEN_INFO_MODAL
  | ModalOp.OPEN_ERROR_MODAL;

function getModalType(type: ModalInfoOp) {
  switch (type) {
    case ModalOp.OPEN_SUCCESS_MODAL:
      return ModalType.SUCCESS;
    case ModalOp.OPEN_ERROR_MODAL:
      return ModalType.ERROR;
    case ModalOp.OPEN_INFO_MODAL:
      return ModalType.INFO;
    default:
      return checkEnumExhausted(type);
  }
}

const reducer: Reducer<ModalConfiguration, ModalAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case ModalOp.OPEN_SUCCESS_MODAL:
    case ModalOp.OPEN_ERROR_MODAL:
    case ModalOp.OPEN_INFO_MODAL:
      return {
        showInfoModal: true,
        showConfirmModal: false,

        modalType: getModalType(action.type),
        modalMessage: action.message,
        onModalClose: action.onClose || (() => null),
      };
    case ModalOp.OPEN_CONFIRM_MODAL:
      return {
        showInfoModal: false,
        showConfirmModal: true,

        modalMessage: action.message,
        onModalCancel: action.onCancel || (() => null),
        onModalConfirm: action.onConfirm || (() => null),
      };
    case ModalOp.CLOSE_MODAL:
      return {
        showInfoModal: false,
        showConfirmModal: false,
      };
    default: {
      const { type } = action;
      return checkEnumExhausted(type);
    }
  }
};

export default reducer;
