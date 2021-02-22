import {AfterViewInit, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ArcRotateCamera, Engine, FreeCamera, Scene} from '@babylonjs/core';

export class Renderer implements OnInit, AfterViewInit  {
    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    public camera: FreeCamera | ArcRotateCamera;
    public scene: Scene;

    @ViewChild('canvas', {static: true}) canvasElement: ElementRef<HTMLCanvasElement>;

    constructor(public zone: NgZone) {
    }

    ngOnInit() {
        this.scene = this.createScene(this.canvasElement);
    }

    ngAfterViewInit() {
        this.animate();
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>) {
        this.canvas = canvas.nativeElement;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        return this.scene;
    }

    public animate() {
        this.zone.runOutsideAngular(() => {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });

            window.addEventListener('resize', () => {
                this.engine.resize();
            });
        });
    }
}
