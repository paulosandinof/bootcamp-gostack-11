import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { DropzoneRootProps } from 'react-dropzone';

interface DropContainerProps extends DropzoneRootProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
}

interface UploadMessageProps {
  type?: 'error' | 'success' | 'default';
}

const dragActive = css`
  border-color: #12a454;
`;

const dragReject = css`
  border-color: #e83f5b;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})<DropContainerProps>`
  border: 1.5px dashed #969cb3;
  border-radius: 5px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive}

  ${(props): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#5636D3',
  error: '#e83f5b',
  success: '#12a454',
};

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 48px 0;

  color: ${({ type }) => messageColors[type || 'default']};

  justify-content: center;
  align-items: center;
`;
