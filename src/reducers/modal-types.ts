import { ModalType } from "../components/InformationModal";

// #region --- Modal Operations ---
export enum ModalOp {
  OPEN_SUCCESS_MODAL = "open_success_modal",
  OPEN_ERROR_MODAL = "open_error_modal",
  OPEN_INFO_MODAL = "open_info_modal",
  OPEN_CONFIRM_MODAL = "open_confirm_modal",
  CLOSE_MODAL = "close_modal",
}
// #endregion --- Modal Operations ---

// #region --- Modal Configuration ---
interface ModalInfoConfiguration {
  showInfoModal: true;
  showConfirmModal: false;

  modalType: ModalType;
  modalMessage: string;
  onModalClose: () => void;
}

interface ModalConfirmConfiguration {
  showInfoModal: false;
  showConfirmModal: true;

  modalMessage: string;
  onModalCancel: () => void;
  onModalConfirm: () => void;
}

interface ModalCloseConfiguration {
  showInfoModal: false;
  showConfirmModal: false;
}

export type ModalConfiguration =
  | ModalInfoConfiguration
  | ModalConfirmConfiguration
  | ModalCloseConfiguration;
// #endregion --- Modal Configuration ---

// #region --- Modal Actions ---
interface InfoAction {
  type:
    | ModalOp.OPEN_SUCCESS_MODAL
    | ModalOp.OPEN_INFO_MODAL
    | ModalOp.OPEN_ERROR_MODAL;
  message: string;
  onClose?: () => void;
}

interface ConfirmAction {
  type: ModalOp.OPEN_CONFIRM_MODAL;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface CloseAction {
  type: ModalOp.CLOSE_MODAL;
}

export type ModalAction = InfoAction | ConfirmAction | CloseAction;
// #endregion --- Modal Actions ---
