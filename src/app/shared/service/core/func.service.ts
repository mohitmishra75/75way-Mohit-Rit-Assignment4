import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';
import { CleanupService } from '../module/cleanup.service';
import { SelectService } from '../module/select.service';
import { PenService } from '../module/pen.service';
import { EraseService } from '../module/erase.service';
import { CreateSquareService } from '../module/create-square.service';
import { CreateLineService } from '../module/create-line.service';
import { ZoomService } from '../module/zoom.service';
import { Erase } from '../../model/erase.model';
import { Trail } from '../../model/trail.model';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class FuncService {
	canvas: any;
	createCircle() {
		// Retrieve the canvas element from the DOM
		const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
		if (!canvas) {
			console.error('Canvas element not found.');
			return;
		}

		// Get the 2D drawing context
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('Failed to get 2D context.');
			return;
		}

		// Define circle properties
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = 50; // You can adjust the radius as needed

		// Draw the circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'blue'; // Set circle fill color
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black'; // Set circle border color
		ctx.stroke();
	}

	constructor(
		private memory: MemoryService,
		private cleanupFunc: CleanupService,
		private selectFunc: SelectService,
		private penFunc: PenService,
		private eraseFunc: EraseService,
		private createSquareFunc: CreateSquareService,
		private createLineFunc: CreateLineService,
		private zoomFunc: ZoomService
	) {}

	//////////////////////////////////////////////////////////
	//
	// Save
	//
	//////////////////////////////////////////////////////////

	save(): void {
		const canvas = this.canvas.nativeElement;
		const dataURL = canvas.toDataURL(); // Convert canvas content to a data URL

		// Send dataURL to server for saving, or save it locally
		this.saveImage(dataURL);
	}
	saveImage(dataURL: any) {
		throw new Error('Method not implemented.');
	}

	//////////////////////////////////////////////////////////
	//
	// Undo / redo
	//
	//////////////////////////////////////////////////////////

	undo(): void {
		this.memory.undo();
	}

	redo(): void {
		this.memory.redo();
	}

	//////////////////////////////////////////////////////////
	//
	// Unload
	//
	//////////////////////////////////////////////////////////

	unload($e: any): void {
		if (this.memory.states.isChangedStates) {
			$e.returnValue = true;
		}
	}

	//////////////////////////////////////////////////////////
	//
	// Select
	//
	//////////////////////////////////////////////////////////

	select(): void {
		this.selectFunc.activate();
	}

	selectAll(): void {
		this.memory.selectedList = [];

		for (let i = 0; i < this.memory.trailList.length; i++) {
			if (!this.memory.trailList[i].visibility) continue;

			const trail: Trail = this.memory.trailList[i];

			for (let j = 0; j < trail.points.length; j++) {
				if (!trail.points[j].visibility) continue;

				this.memory.selectedList.push(i);
				break;
			}
		}
	}

	//////////////////////////////////////////////////////////
	//
	// Clean up
	//
	//////////////////////////////////////////////////////////

	cleanUp(): void {
		this.cleanupFunc.activate();
	}

	//////////////////////////////////////////////////////////
	//
	// Hand
	//
	//////////////////////////////////////////////////////////

	hand(): void {
		this.memory.reservedByFunc.current = {
			name: 'hand',
			type: '',
			group: ''
		};
	}

	//////////////////////////////////////////////////////////
	//
	// Pen
	//
	//////////////////////////////////////////////////////////

	pen(): void {
		this.penFunc.activate();
	}

	//////////////////////////////////////////////////////////
	//
	// Eraser
	//
	//////////////////////////////////////////////////////////

	eraser(): void {
		this.eraseFunc.activate();
	}

	//////////////////////////////////////////////////////////
	//
	// Create square
	//
	//////////////////////////////////////////////////////////

	createSquare(): void {
		this.createSquareFunc.activate();
	}

	//////////////////////////////////////////////////////////
	//
	// Create line
	//
	//////////////////////////////////////////////////////////

	createLine(): void {
		this.createLineFunc.activate();
	}

	//////////////////////////////////////////////////////////
	//
	// Zoom
	//
	//////////////////////////////////////////////////////////

	zoom($toggleFlg?: boolean): void {
		this.zoomFunc.activate($toggleFlg);
	}
}
