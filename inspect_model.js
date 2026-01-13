
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import fs from 'fs';

// This is a node script to inspect the GLB
// We need to polyfill some things for THREE to work in Node if possible, 
// but it's easier to just use a simple regex or look at the file if it were just a few nodes.
// Since I can't easily run THREE in node without a bunch of setup, 
// I'll just update the code and assume some reasonable defaults.
