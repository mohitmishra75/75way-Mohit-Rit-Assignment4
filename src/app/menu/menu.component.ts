import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MemoryService } from '../shared/service/core/memory.service';
import { FuncService } from '../shared/service/core/func.service';

// Fontawesome
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	@ViewChildren('menuTitlesRef') menuTitlesRef: QueryList<ElementRef>;
	@ViewChildren('menuListsRef') menuListsRef: QueryList<ElementRef>;
	@ViewChildren('menuListTitlesRef') menuListTitlesRef: QueryList<ElementRef>;
	@ViewChildren('subMenuListsRef') subMenuListsRef: QueryList<ElementRef>;
	@ViewChildren('subMenuListTitlesRef') subMenuListTitlesRef: QueryList<ElementRef>;
	@ViewChildren('subSubMenuListsRef') subSubMenuListsRef: QueryList<ElementRef>;

	menuTitles: string[];
	menuLists: MenuList[][] = [];
	subMenuLists: MenuList[][];

	faPenNib = faPenNib;
	faUser = faUser;
	faCaretRight = faCaretRight;

	activeStickFlg = false;

	constructor(private memory: MemoryService, private func: FuncService) {
		this.menuTitles = ['File', 'Edit', 'Change', 'View'];
		this.menuLists.push(this._file());
		this.menuLists.push(this._edit());
		this.menuLists.push(this._modify());
		this.menuLists.push(this._show());
	}

	ngOnInit(): void {}

	initializeActiveStates(): void {
		this.toggleActiveSticks();
		this._removeAllActives();
	}

	toggleActiveSticks(): void {
		// Sync with other modules
		this.memory.states.isCanvasLocked = !this.memory.states.isCanvasLocked;
		// Apply to the local state
		this.activeStickFlg = this.memory.states.isCanvasLocked;
	}

	removeActives($type: string, $event: any): void {
		if ($type === 'menu') {
			const classList: any = $event.target.classList;
			if (classList.contains('menu-title')) {
				this._removeAllActives();
			}

			// To set actives to currentTarget after initializations
			const children: HTMLCollection = $event.currentTarget.children;
			if (
				children.length === 2 &&
				!children[0].classList.contains('active') &&
				!children[1].classList.contains('active')
			) {
				children[0].classList.add('active');
				children[1].classList.add('active');
			}
		} else if ($type === 'menuList') {
			const classList: any = $event.target.classList;
			if (classList.contains('menu-list-title')) {
				this._removeActiveFromMenuLists();
				this._removeActiveFromSubMenuLists();
			}
		} else if ($type === 'subMenuList') {
			const classList: any = $event.target.classList;
			if (classList.contains('menu-list-title')) {
				this._removeActiveFromSubMenuLists();
			}
		}
	}

	private _removeAllActives(): void {
		this._removeActiveFromMenus();
		this._removeActiveFromMenuLists();
		this._removeActiveFromSubMenuLists();
	}

	private _removeActiveFromMenus(): void {
		const menuTitles: ElementRef<any>[] = this.menuTitlesRef.toArray();
		for (let i = 0; i < menuTitles.length; i++) {
			const menuTitle: HTMLElement = menuTitles[i].nativeElement;
			if (menuTitle.classList.contains('active')) menuTitle.classList.remove('active');
		}

		const menuLists: ElementRef<any>[] = this.menuListsRef.toArray();
		for (let i = 0; i < menuLists.length; i++) {
			const menuList: HTMLElement = menuLists[i].nativeElement;
			if (menuList.classList.contains('active')) menuList.classList.remove('active');
		}
	}

	private _removeActiveFromMenuLists(): void {
		const menuListTitles: ElementRef<any>[] = this.menuListTitlesRef.toArray();
		for (let i = 0; i < menuListTitles.length; i++) {
			const menuListTitle: HTMLElement = menuListTitles[i].nativeElement;
			if (menuListTitle.classList.contains('active')) menuListTitle.classList.remove('active');
		}

		const subMenuLists: ElementRef<any>[] = this.subMenuListsRef.toArray();
		for (let i = 0; i < subMenuLists.length; i++) {
			const subMenuList: HTMLElement = subMenuLists[i].nativeElement;
			if (subMenuList.classList.contains('active')) subMenuList.classList.remove('active');
		}
	}

	private _removeActiveFromSubMenuLists(): void {
		const subMenuListTitles: ElementRef<any>[] = this.subMenuListTitlesRef.toArray();
		for (let i = 0; i < subMenuListTitles.length; i++) {
			const subMenuListTitle: HTMLElement = subMenuListTitles[i].nativeElement;
			if (subMenuListTitle.classList.contains('active')) subMenuListTitle.classList.remove('active');
		}

		const subSubMenuLists: ElementRef<any>[] = this.subSubMenuListsRef.toArray();
		for (let i = 0; i < subSubMenuLists.length; i++) {
			const subSubMenuList: HTMLElement = subSubMenuLists[i].nativeElement;
			if (subSubMenuList.classList.contains('active')) subSubMenuList.classList.remove('active');
		}
	}

	private _file(): MenuList[] {
		const menuList: MenuList[] = [
			{
				title: 'None',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		return menuList;
	}

	private _edit(): MenuList[] {
		const menuList: MenuList[] = [
			{
				title: 'Undo',
				key: 'Ctrl+Z',
				type: 0,
				exec: () => {
					this.func.undo();
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Redo',
				key: 'Shift+Ctrl+Z',
				type: 0,
				exec: () => {
					this.func.redo();
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Cut',
				key: 'Ctrl+X',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Copy',
				key: 'Ctrl+C',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Paste',
				key: 'Ctrl+V',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Delete',
				key: 'Del',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Duplicate',
				key: 'Ctrl+D',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Select All',
				key: 'Ctrl+A',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Deselect All',
				key: 'Shift+Ctrl+A',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Invert Selection',
				key: 'Shift+Ctrl+I',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		return menuList;
	}

	private _modify(): MenuList[] {
		const subMenuListOrder: MenuList[] = [
			{
				title: 'To Front',
				key: 'Shift+Ctrl+Up Arrow',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'One Step Forward',
				key: 'Ctrl+Up Arrow',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'One Step Backward',
				key: 'Ctrl+Down Arrow',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'To Back',
				key: 'Shift+Ctrl+Down Arrow',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		const subMenuListAlign: MenuList[] = [
			{
				title: 'Left Align',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Horizontal Center Alignment',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Right Alignment',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {},
				subMenuList: []
			},
			{
				title: 'Top Alignment',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Vertical Center Alignment',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Bottom Alignment',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		const subMenuListTransform: MenuList[] = [
			{
				title: 'Rotate 45° to the left',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Rotate 90° to the left',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Rotate 180° to the left',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {},
				subMenuList: []
			},
			{
				title: 'Rotate 45° to the right',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Rotate 90° to the right',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Rotate 180° to the right',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {},
				subMenuList: []
			},
			{
				title: 'Mirror vertically',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Mirror Horizontally',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		const menuList: MenuList[] = [
			{
				title: 'Stacking Order',
				key: '',
				type: 1,
				exec: () => {},
				subMenuList: subMenuListOrder
			},
			{
				title: 'Configuration',
				key: '',
				type: 1,
				exec: () => {},
				subMenuList: subMenuListAlign
			},
			{
				title: 'Move',
				key: '',
				type: 1,
				exec: () => {},
				subMenuList: subMenuListTransform
			}
		];

		return menuList;
	}

	private _show(): MenuList[] {
		const menuList: MenuList[] = [
			{
				title: 'Original View',
				key: 'Ctrl+O',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Fit selection to screen',
				key: '',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Fit the whole thing to the screen',
				key: 'Alt+Ctrl+O',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: '',
				key: '',
				type: 2,
				exec: () => {},
				subMenuList: []
			},
			{
				title: 'Expansion',
				key: 'Ctrl+Space+Drag',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			},
			{
				title: 'Zoom Out',
				key: 'Ctrl+Alt+Space+Drag',
				type: 0,
				exec: () => {
					this.initializeActiveStates();
				},
				subMenuList: []
			}
		];

		return menuList;
	}
}

interface MenuList {
	title: string;
	key: string;
	type: number; // 0: menu-list, 1: sub-menu-list, 2: separator
	exec: Function;
	subMenuList: MenuList[];
}
