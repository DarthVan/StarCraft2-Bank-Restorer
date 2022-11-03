/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import './style.css';

/** DropZone **
* ...
* @Author Star Noob
* @Created 2022-10-26
*/

interface Props {
	children?: JSX.Element[] | JSX.Element;
	style?: CSSProperties;
	onDragStateChange?: (isDragActive: boolean) => void;
	onFilesDrop?: (files: File[]) => void;
	onDragOver?: () => void;
	onDragEnter?: () => void;
	onDragLeave?: () => void;
	onDrop?: () => void;
}

const DropZone: FC<Props> = (props: Props): JSX.Element => {
	const [isDragActive, setIsDragActive] = useState(false);
	const dropZoneRef = useRef<null | HTMLDivElement>(null);

	const mapFileListToArray: (files: FileList) => File[] = (files: FileList): File[] => {
		const array: File[] = [];
		for (let i = 0; i < files.length; i++)
			array.push(files.item(i));
		return array;
	};

	const callbacks = {
		onDragStart: useCallback((e: any): void => {
			e.preventDefault();
			e.stopPropagation();
			//props.onDragEnter?.(); // if exist, call that
			e.dataTransfer.clearData();
			e.dataTransfer.setData('text/plain', e.target.dataset.item);
		}, []),

		onDragEnter: useCallback((e: any): void => {
			e.preventDefault();
			e.stopPropagation();
			props.onDragEnter?.(); // if exist, call that
			if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
				setIsDragActive(true);
		}, [props.onDragEnter]),

		onDragLeave: useCallback((e: any): void => {
			e.preventDefault();
			e.stopPropagation();
			props.onDragLeave?.();
			setIsDragActive(false);
		}, [props.onDragLeave]),

		onDragOver: useCallback((e: any): void => {
			e.preventDefault();
			e.stopPropagation();
			props.onDragOver?.();
			if (!isDragActive)
				setIsDragActive(true);
		}, [isDragActive, props.onDragOver]),

		onDrop: useCallback((e: any): void => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragActive(false);
			props.onDrop?.();
			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				props.onFilesDrop?.(mapFileListToArray(e.dataTransfer.files));
				//e.dataTransfer.clearData();
			}
		}, [props.onDrop, props.onFilesDrop])
	};

	useEffect((): void => {
		props.onDragStateChange?.(isDragActive);
	}, [isDragActive]);

	useEffect((): (() => void) => {
		const zoneRef: HTMLDivElement = dropZoneRef?.current;
		if (zoneRef) {
			zoneRef.addEventListener('dragstart', callbacks.onDragStart);
			zoneRef.addEventListener('dragenter', callbacks.onDragEnter);
			zoneRef.addEventListener('dragleave', callbacks.onDragLeave);
			zoneRef.addEventListener('dragover', callbacks.onDragOver);
			zoneRef.addEventListener('drop', callbacks.onDrop);
		}

		// Remove listeners from dropzone on unmount:
		return (): void => {
			zoneRef?.removeEventListener('dragstart', callbacks.onDragStart);
			zoneRef?.removeEventListener('dragenter', callbacks.onDragEnter);
			zoneRef?.removeEventListener('dragleave', callbacks.onDragLeave);
			zoneRef?.removeEventListener('dragover', callbacks.onDragOver);
			zoneRef?.removeEventListener('drop', callbacks.onDrop);
		}
	}, []);

	return (
		<div className={'DropZone' + (isDragActive ? ' DropZone-active' : '')} style={props.style} ref={dropZoneRef}>
			{props.children ? props.children : "Drop file here!"}
		</div>
	);
}

export default React.memo(DropZone);