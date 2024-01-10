import styled from 'styled-components'
interface IProps {
  color?: string
  background?: string
  borderleft?: string
  borderBottom?: string
}
export const JobTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px auto 20px auto;
`
export const JobNameContainer = styled.div`
  display: grid;
  align-items: center;
  gap: 5px;
`
export const JobName = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1d1d;
`
export const JobType = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
`

export const DateSection = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
`

export const SubDateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;

  .ant-picker {
    position: relative;
    height: 44px;
    svg {
      opacity: 0;
    }
  }
  .anticon {
    position: absolute;
    bottom: 32%;
    right: 8%;
    z-index: 999;
    font-size: 11px;
  }
`

export const MainDateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 200px;
  .ant-picker {
    position: relative;
    height: 44px;
  }
  .anticon {
    position: absolute;
    bottom: 15%;
    right: 8%;
    z-index: 999;
  }
`
export const JobStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #1d1d1d;
  font-weight: 400;
  margin: 20px 0;
  .ant-switch-inner {
    background: #1d2e88;
  }
`

export const AnalystSection = styled.div`
  border: 1px solid #8896e1;
  /* background: #8896e1; */
  background: linear-gradient(0deg, #dce2ff, #dce2ff), linear-gradient(0deg, #8896e1, #8896e1);
  padding: 19px 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
`

export const Time = styled.div`
  display: flex;
  gap: 10px;
  font-weight: 400;
  font-size: 12px;
  color: #686868;
`
export const Heading = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
  margin: 13px 0;
`
export const MeetSection = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #1d2e88;
  display: flex;
  justify-content: space-between;
`
export const ButtonWrapper = styled.div`
  display: flex;
  grid-gap: 20px;
  justify-content: flex-end;
  padding-top: 30px;
`
export const RejectButton = styled.button`
  width: 100%;
  max-width: 200px;
  height: 44px;
  background-color: #f3f5ff;
  color: ${(props) => props.color || '#000'};
  border: ${(props) => `2px solid ${props.color}` || '2px solid #fff'};
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  cursor: pointer;
`

export const ParticipantsSection = styled.div`
  margin-top: 10px;
  .ant-select-selector {
    height: 43px;
  }
`
export const MoveButton = styled.button<IProps>`
  width: 100%;
  max-width: 200px;
  height: 44px;

  background-color: ${(props) => props.color || ' rgba(29, 46, 136, 1)'};
  color: ${(props) => props.background || ' #fff'};
  border-radius: 8px;
  padding: 10px, 16px, 10px, 16px;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
`
export const Link = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #979797;
`
export const JobStatus = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
  white-space: nowrap;
  margin-top: 10px;
`
export const StatusTypeSelect = styled.div`
  width: 100%;
  min-width: 100px;
  .ant-select-selector {
    background: transparent !important;
  }
`
export const TimelineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const TypeName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #686868;
`
export const DaysNumber = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #1d1d1d;
`
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 350px;
`
export const SideContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
`
export const PreviewButton = styled.div`
  margin: 20px auto 10px auto;
`

export const InformationSection = styled.div`
  display: flex;

  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
  justify-content: space-between;
  width: 100%;
  max-width: 747px;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export const ScheduleSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  /* max-width: 1627px; */
  /* padding: 27px 60px; */
  border-top: 1px solid #bcc6fc;
  justify-content: center;
`

export const SecondSection = styled.div`
  width: 100%;
  max-width: 57%;
  padding: 30px 0 0 40px;
  .fc .fc-timegrid-slot {
    height: 4rem;
  }
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: rgb(220, 226, 255);
    border-color: rgb(220, 226, 255);
    color: #000;
  }
  .fc-timegrid-axis .fc-scrollgrid-shrink {
    height: 7rem;
  }
  .fc-scrollgrid-sync-table {
    height: 7rem !important;
  }
  .fc-timegrid-divider {
    padding: 0;
    border: 0;
  }
  .fc-col-header {
    width: 663px;
    height: 4rem;
    text-align: center;
    line-height: 58px;
    background: #dce2ff;
    border: 0;
  }
  .fc-col-header {
    width: 100% !important;
  }
  .fc-col-header th {
    border: 0;
  }
  .fc-direction-ltr .fc-timegrid-slot-label-frame {
    text-align: center;
  }
  .fc .fc-timegrid-axis-frame {
    background: #dce2ff;
    border: 0;
  }
  colgroup {
    background: #dce2ff;
    border: 0;
  }
  .fc .fc-button-primary:disabled {
    color: #8896e1;

    border: 1px solid #8896e1;
    background: unset;
  }
  .fc .fc-button-primary {
    background-color: #fff;
    border-color: #fff;
    color: #000;
  }
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: unset;
  }
  .fc-button-primary:not(:disabled):active {
    background-color: #fff;
    border: unset;
    color: #000;
  }
  .fc-button-primary:not(:disabled):focus {
    background-color: #fff;
    border: unset;
    color: #000;
  }
  .fc .fc-button-primary:focus {
    box-shadow: unset;
  }
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: unset;
  }
  .fc .fc-button-primary:not(:disabled):focus {
    box-shadow: unset;
  }
  .fc-dayGridMonth-button {
    display: none;
  }
  .fc-col-header-cell-cushion {
    font-weight: 400;
  }
`

export const FirstSection = styled.div`
  position: relative;

  border-right: 1px solid #bcc6fc;
  padding-right: 30px;
  width: 100%;
  max-width: 32%;
  .custom-time-picker {
    display: inline-block;
  }

  .custom-time-picker .ant-picker {
    width: 100%;
  }

  .custom-time-picker .ant-picker-input {
    border: none;
    background-color: transparent;
    padding: 0;
    height: auto;
    line-height: 1;
  }
  div {
    .ant-btn-default:not(:disabled):hover {
      border: unset !important;
      background: unset !important;
      color: unset !important;
      box-shadow: unset !important;
    }
    .ant-btn-default {
      box-shadow: unset !important;
    }
    .ant-btn:not(:disabled):focus-visible {
      outline: unset;
    }
  }
`

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 100%;
  @media (max-width: 1068px) {
    flex-direction: column;
    gap: 20px;
  }
`
export const FormContainer = styled.div`
  padding: 10px 0;
  width: 100%;
  max-width: 700px;
`
export const DescriptionContainer = styled.div`
  margin: 20px 0 10px 0;
  .ql-toolbar.ql-snow {
    border-radius: 10px 10px 0 0;
    background: linear-gradient(0deg, #b9b9b9, #b9b9b9), linear-gradient(0deg, #e8e8e8, #e8e8e8);
    color: #000;
  }
  .ql-blank {
    background: #fff;
    border-radius: 0 0 10px 10px;
  }
  .ql-picker {
    color: #000;
  }

  .ql-container {
    height: 100px;
    border-radius: 0 0 10px 10px;
  }
`
export const ValidationContainer = styled.div`
  background: #f3f5ff;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  margin-top: 38px;

  @media (max-width: 1068px) {
    width: -webkit-fill-available;
    max-width: 100%;
  }
`
export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-top: 28px;
`
export const JobInputWrapper = styled.span``
export const SalaryWrapper = styled.div`
  display: grid;
`
export const SalaryConatainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
  @media (max-width: 968px) {
    display: grid;
  }
  .ant-input {
    min-width: 160px;
  }
  .ant-select {
    min-width: 160px;
  }
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  margin: 20px 0;
`
export const CancelButton = styled.div`
  width: 100%;
  max-width: 302px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e8;
  color: #1d1d1d;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
`
export const ModalButtonWrapper = styled.div`
  margin-top: 20px;
`
export const SaveButton = styled.button`
  background: #1d2e88;
  color: #ffffff;
  width: -webkit-fill-available;
  margin: 0 auto;
  height: 56px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 15px;
  border: none;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  font-size: 16px;
  font-weight: 600;
`
export const CorrectField = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const WarningField = styled.div`
  padding: 15px;
  color: #1d1d1d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const WaitingField = styled.div`
  padding: 15px;
  color: #1d1d1d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const TabWrapper = styled.div`
  color: #1d2e88;
`
