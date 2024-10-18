import{b as j,o as C,f as I,T as F,w as A,c as N,a as D,aL as L,u as P,t as Q,g as V,P as E,V as f,aY as W,I as k,W as m,aZ as S,a_ as v,a$ as G,S as M,al as H,C as b,D as X,E as R,R as $,N as _,H as Z,U as Y,M as q,B as z,J,K,Q as ee,X as te,Y as re,Z as ae,_ as ie,$ as se,a0 as ne,b0 as oe,b1 as le,b2 as de,aI as he,b3 as ue,ab as ce,b4 as fe,G as pe,s as me,x as ge,y as ve,aq as xe,p as Te,A as we,q as Me,z as Se}from"./SkeletonUtils-B_bGocrk.js";const O=(o,e)=>{const t=o.__vccOpts||o;for(const[r,a]of e)t[r]=a;return t},be={key:0,class:"loading"},ye={class:"bar"},Be={__name:"Loading",setup(o){var e=j({urls:"",index:0,max:1,percent:0});function t(a){e.value=a}function r(){return e.value.percent==100}return window.addEventListener("updateLoading",function(a){t(a.detail)}),(a,i)=>(C(),I(F,{name:"fade-loading"},{default:A(()=>[r()==!1?(C(),N("div",be,[D("div",ye,[D("div",{class:"progress",style:L({width:P(e).percent+"%"})},null,4)]),D("label",null,"Loading: "+Q(P(e).percent)+"%",1)])):V("",!0)]),_:1}))}},De=O(Be,[["__scopeId","data-v-324b43ed"]]);class Ce{constructor(){this.actions=[],this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.speed=1,this.running=!1,this.index=0}add(e=()=>{},t=-1){this.actions.push({rate:1/t,sum:1/t,alpha:0,callback:e})}update(e){if(this.running==!0&&(this.index=requestAnimationFrame(e),this.actions.length>0))for(var t=this.getDelta(),r=this.actions[0].sum/this.actions[0].rate,a=this.actions.length-1;a>=0;a--)this.actions[a].sum+=t,(this.actions[a].sum>=this.actions[a].rate||this.actions[a].rate==-1)&&(this.actions[a].sum%=this.actions[a].rate,this.actions[a].callback({delta:this.actions[a].rate==-1?t:this.actions[a].rate,alpha:a==0?0:r,index:this.index}))}start(){this.startTime=this.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0;var e=(function(){this.update(e)}).bind(this);e()}stop(){this.getElapsedTime(),this.running=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.running){const t=this.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e*this.speed}now(){return(typeof performance>"u"?Date:performance).now()}}class Pe extends E{constructor(e,t,r,a={}){super(),this.pixelSize=e,this.resolution=new f,this.renderResolution=new f,this.pixelatedMaterial=this.createPixelatedMaterial(),this.normalMaterial=new W,this.fsQuad=new k(this.pixelatedMaterial),this.scene=t,this.camera=r,this.normalEdgeStrength=a.normalEdgeStrength||.3,this.depthEdgeStrength=a.depthEdgeStrength||.4,this.beautyRenderTarget=new m,this.beautyRenderTarget.texture.minFilter=S,this.beautyRenderTarget.texture.magFilter=S,this.beautyRenderTarget.texture.type=v,this.beautyRenderTarget.depthTexture=new G,this.normalRenderTarget=new m,this.normalRenderTarget.texture.minFilter=S,this.normalRenderTarget.texture.magFilter=S,this.normalRenderTarget.texture.type=v}dispose(){this.beautyRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.pixelatedMaterial.dispose(),this.normalMaterial.dispose(),this.fsQuad.dispose()}setSize(e,t){this.resolution.set(e,t),this.renderResolution.set(e/this.pixelSize|0,t/this.pixelSize|0);const{x:r,y:a}=this.renderResolution;this.beautyRenderTarget.setSize(r,a),this.normalRenderTarget.setSize(r,a),this.fsQuad.material.uniforms.resolution.value.set(r,a,1/r,1/a)}setPixelSize(e){this.pixelSize=e,this.setSize(this.resolution.x,this.resolution.y)}render(e,t){const r=this.fsQuad.material.uniforms;r.normalEdgeStrength.value=this.normalEdgeStrength,r.depthEdgeStrength.value=this.depthEdgeStrength,e.setRenderTarget(this.beautyRenderTarget),e.render(this.scene,this.camera);const a=this.scene.overrideMaterial;e.setRenderTarget(this.normalRenderTarget),this.scene.overrideMaterial=this.normalMaterial,e.render(this.scene,this.camera),this.scene.overrideMaterial=a,r.tDiffuse.value=this.beautyRenderTarget.texture,r.tDepth.value=this.beautyRenderTarget.depthTexture,r.tNormal.value=this.normalRenderTarget.texture,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this.fsQuad.render(e)}createPixelatedMaterial(){return new M({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tNormal:{value:null},resolution:{value:new H(this.renderResolution.x,this.renderResolution.y,1/this.renderResolution.x,1/this.renderResolution.y)},normalEdgeStrength:{value:0},depthEdgeStrength:{value:0}},vertexShader:`
				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D tDiffuse;
				uniform sampler2D tDepth;
				uniform sampler2D tNormal;
				uniform vec4 resolution;
				uniform float normalEdgeStrength;
				uniform float depthEdgeStrength;
				varying vec2 vUv;

				float getDepth(int x, int y) {

					return texture2D( tDepth, vUv + vec2(x, y) * resolution.zw ).r;

				}

				vec3 getNormal(int x, int y) {

					return texture2D( tNormal, vUv + vec2(x, y) * resolution.zw ).rgb * 2.0 - 1.0;

				}

				float depthEdgeIndicator(float depth, vec3 normal) {

					float diff = 0.0;
					diff += clamp(getDepth(1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(-1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, 1) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, -1) - depth, 0.0, 1.0);
					return floor(smoothstep(0.01, 0.02, diff) * 2.) / 2.;

				}

				float neighborNormalEdgeIndicator(int x, int y, float depth, vec3 normal) {

					float depthDiff = getDepth(x, y) - depth;
					vec3 neighborNormal = getNormal(x, y);

					// Edge pixels should yield to faces who's normals are closer to the bias normal.
					vec3 normalEdgeBias = vec3(1., 1., 1.); // This should probably be a parameter.
					float normalDiff = dot(normal - neighborNormal, normalEdgeBias);
					float normalIndicator = clamp(smoothstep(-.01, .01, normalDiff), 0.0, 1.0);

					// Only the shallower pixel should detect the normal edge.
					float depthIndicator = clamp(sign(depthDiff * .25 + .0025), 0.0, 1.0);

					return (1.0 - dot(normal, neighborNormal)) * depthIndicator * normalIndicator;

				}

				float normalEdgeIndicator(float depth, vec3 normal) {

					float indicator = 0.0;

					indicator += neighborNormalEdgeIndicator(0, -1, depth, normal);
					indicator += neighborNormalEdgeIndicator(0, 1, depth, normal);
					indicator += neighborNormalEdgeIndicator(-1, 0, depth, normal);
					indicator += neighborNormalEdgeIndicator(1, 0, depth, normal);

					return step(0.1, indicator);

				}

				void main() {

					vec4 texel = texture2D( tDiffuse, vUv );

					float depth = 0.0;
					vec3 normal = vec3(0.0);

					if (depthEdgeStrength > 0.0 || normalEdgeStrength > 0.0) {

						depth = getDepth(0, 0);
						normal = getNormal(0, 0);

					}

					float dei = 0.0;
					if (depthEdgeStrength > 0.0)
						dei = depthEdgeIndicator(depth, normal);

					float nei = 0.0;
					if (normalEdgeStrength > 0.0)
						nei = normalEdgeIndicator(depth, normal);

					float Strength = dei > 0.0 ? (1.0 - depthEdgeStrength * dei) : (1.0 + normalEdgeStrength * nei);

					gl_FragColor = texel * Strength;

				}
			`})}}class x extends E{constructor(e,t,r,a){super(),this.renderScene=t,this.renderCamera=r,this.selectedObjects=a!==void 0?a:[],this.visibleEdgeColor=new b(1,1,1),this.hiddenEdgeColor=new b(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new f(e.x,e.y):new f(256,256);const i=Math.round(this.resolution.x/this.downSampleRatio),s=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new m(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new X,this.depthMaterial.side=R,this.depthMaterial.depthPacking=$,this.depthMaterial.blending=_,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=R,this.prepareMaskMaterial.fragmentShader=h(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new m(this.resolution.x,this.resolution.y,{type:v}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new m(i,s,{type:v}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new m(i,s,{type:v}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new m(Math.round(i/2),Math.round(s/2),{type:v}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new m(i,s,{type:v}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new m(Math.round(i/2),Math.round(s/2),{type:v}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const n=4,c=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(n),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(c),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(i/2),Math.round(s/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=c,this.overlayMaterial=this.getOverlayMaterial();const d=Z;this.copyUniforms=Y.clone(d.uniforms),this.materialCopy=new M({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:_,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new b,this.oldClearAlpha=1,this.fsQuad=new k(null),this.tempPulseColor1=new b,this.tempPulseColor2=new b,this.textureMatrix=new q;function h(u,p){const g=p.isPerspectiveCamera?"perspective":"orthographic";return u.replace(/DEPTH_TO_VIEW_Z/g,g+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let r=Math.round(e/this.downSampleRatio),a=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(r,a),this.renderTargetBlurBuffer1.setSize(r,a),this.renderTargetEdgeBuffer1.setSize(r,a),this.separableBlurMaterial1.uniforms.texSize.value.set(r,a),r=Math.round(r/2),a=Math.round(a/2),this.renderTargetBlurBuffer2.setSize(r,a),this.renderTargetEdgeBuffer2.setSize(r,a),this.separableBlurMaterial2.uniforms.texSize.value.set(r,a)}updateSelectionCache(){const e=this._selectionCache;function t(r){r.isMesh&&e.add(r)}e.clear();for(let r=0;r<this.selectedObjects.length;r++)this.selectedObjects[r].traverse(t)}changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const r of this._selectionCache)e===!0?r.visible=t.get(r):(t.set(r,r.visible),r.visible=e)}changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,r=this._selectionCache;function a(i){if(i.isMesh||i.isSprite){if(!r.has(i)){const s=i.visible;(e===!1||t.get(i)===!0)&&(i.visible=e),t.set(i,s)}}else(i.isPoints||i.isLine)&&(e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e))}this.renderScene.traverse(a)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,t,r,a,i){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,i&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.updateSelectionCache(),this.changeVisibilityOfSelectedObjects(!1);const n=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=n,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const c=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(c),this.tempPulseColor2.multiplyScalar(c)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=x.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=x.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=x.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=x.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,i&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(r),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=r.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new M({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new f(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new M({uniforms:{maskTexture:{value:null},texSize:{value:new f(.5,.5)},visibleEdgeColor:{value:new z(1,1,1)},hiddenEdgeColor:{value:new z(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeperableBlurMaterial(e){return new M({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new M({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:J,depthTest:!1,depthWrite:!1,transparent:!0})}}x.BlurDirectionX=new f(1,0),x.BlurDirectionY=new f(0,1);var y=function(){var o=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(h){h.preventDefault(),r(++o%e.children.length)},!1);function t(h){return e.appendChild(h.dom),h}function r(h){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===h?"block":"none";o=h}var a=(performance||Date).now(),i=a,s=0,n=t(new y.Panel("FPS","#0ff","#002")),c=t(new y.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new y.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:e,addPanel:t,showPanel:r,begin:function(){a=(performance||Date).now()},end:function(){s++;var h=(performance||Date).now();if(c.update(h-a,200),h>=i+1e3&&(n.update(s*1e3/(h-i),100),i=h,s=0,d)){var u=performance.memory;d.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return h},update:function(){a=this.end()},domElement:e,setMode:r}};y.Panel=function(o,e,t){var r=1/0,a=0,i=Math.round,s=i(window.devicePixelRatio||1),n=80*s,c=48*s,d=3*s,h=2*s,u=3*s,p=15*s,g=74*s,T=30*s,w=document.createElement("canvas");w.width=n,w.height=c,w.style.cssText="width:80px;height:48px";var l=w.getContext("2d");return l.font="bold "+9*s+"px Helvetica,Arial,sans-serif",l.textBaseline="top",l.fillStyle=t,l.fillRect(0,0,n,c),l.fillStyle=e,l.fillText(o,d,h),l.fillRect(u,p,g,T),l.fillStyle=t,l.globalAlpha=.9,l.fillRect(u,p,g,T),{dom:w,update:function(B,U){r=Math.min(r,B),a=Math.max(a,B),l.fillStyle=t,l.globalAlpha=1,l.fillRect(0,0,n,p),l.fillStyle=e,l.fillText(i(B)+" "+o+" ("+i(r)+"-"+i(a)+")",d,h),l.drawImage(w,u+s,p,g-s,T,u,p,g-s,T),l.fillRect(u+g-s,p,s,T),l.fillStyle=t,l.globalAlpha=.9,l.fillRect(u+g-s,p,s,i((1-B/U)*T))}}};class Ee{constructor(e){this.camera=new K(45,window.innerWidth/window.innerHeight,1,100),this.scene=new ee,this.canvas=e,this.stats=new y,window.devicePixelRatio=1,this.renderer=new te({alpha:!0,canvas:e}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.type=re,this.renderPass=new ae(this.scene,this.camera),this.outputPass=new ie,this.outlinePass=new x({x:window.innerWidth,y:window.innerHeight},this.scene,this.camera),this.outlinePass.edgeStrength=3,this.outlinePass.edgeGlow=0,this.outlinePass.edgeThickness=.125,this.outlinePass.visibleEdgeColor.set("#000000"),this.outlinePass.hiddenEdgeColor.set("#000000"),this.outlinePass.enabled=!0,this.smaaPass=new se(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio),this.smaaPass.enabled=!1,this.pixelatedPass=new Pe(2,this.scene,this.camera),this.pixelatedPass.normalEdgeStrength=1,this.pixelatedPass.depthEdgeStrength=1,this.pixelatedPass.enabled=!1,this.composer=new ne(this.renderer),this.composer.addPass(this.renderPass),this.composer.addPass(this.pixelatedPass),this.composer.addPass(this.outlinePass),this.composer.addPass(this.smaaPass),this.composer.addPass(this.outputPass),window.addEventListener("resize",(function(t){this.resize(t)}).bind(this)),this.resize()}render(){this.stats.begin(),this.composer.render(),this.stats.end()}resize(e){var t=window.innerWidth,r=window.innerHeight,a=t/r;this.camera.isOrthographicCamera&&(this.camera.left=-a,this.camera.right=a,this.camera.top=1,this.camera.bottom=-1),this.camera.aspect=a,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,r),this.composer.setSize(t,r)}setCamera(e){this.camera=e,this.renderPass.camera=e,this.pixelatedPass.camera=e,this.outlinePass.renderCamera=e}setScene(e){this.scene=e,this.renderPass.scene=e,this.pixelatedPass.scene=e,this.outlinePass.renderScene=e}setShadows(e=!0){this.renderer.shadowMap.enabled=e,this.scene.traverse(function(t){t.material&&(t.castShadow=e,t.receiveShadow=e,t.material.needsUpdate=!0)})}setSelectedObjects(e=[]){this.outlinePass.selectedObjects=e}addStats(){document.body.appendChild(this.stats.dom)}removeStats(){document.body.removeChild(this.stats.dom)}}class ke{constructor(){}static create(e="point",t={}){var r,a;return t=Object.assign({color:"#ffffff",decay:2,distance:0,groundColor:"#000000",intensity:Math.PI,position:{x:0,y:0,z:0},shadow:!1,skyColor:"#ffffff"},t),e=="ambient"?r=new oe(t.color,t.intensity):e=="directional"?(r=new le(t.color,t.intensity),a=new de(r)):e=="hemisphere"?(r=new he(t.skyColor,t.groundColor,t.intensity),a=new ue(r)):e=="point"&&(r=new ce(t.color,t.intensity,t.distance,t.decay),a=new fe(r)),r.position.copy(t.position),t.shadow&&(r.castShadow=!0),t.helper==!0&&a&&(r.addEventListener("added",function(i){r.parent.add(a)}),r.addEventListener("removed",function(i){a.removeFromParent()})),r}}class Re extends pe{constructor(e){super(e)}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,(function(s){var n=s.scene;n.name=a,n.animations=s.animations,n.userData={...i.userData},n.duplicate=this.duplicate.bind(this,n),this.manager.cache[a]=n,this.addMixer(n)}).bind(this),function(s){},function(s){console.error(`Error: Model "${i.url}" not found.`)})}catch{console.error(`Error: File "${e}" not found.`)}}duplicate(t){var t=me(t);return this.addMixer(t),t}addMixer(e){if(e.animations.length>0){var t=e.userData.loop||2201;e.mixer=new ge(e),e.actions={};for(var r=0;r<e.animations.length;r++){var a=e.animations[r],i=e.mixer.clipAction(a);t==2200&&(i.setLoop(t),i.clampWhenFinished=!0),i.play(),i.setEffectiveWeight(0),e.actions[a.name]=i,r==0&&(e.actions.active=i,i.setEffectiveWeight(1))}e.play=function(s,n=1){var c=e.actions.active,d=e.actions[s];d&&d!=c&&(c==null?(d.setEffectiveWeight(1),d.reset().fadeIn(n)):(c.setEffectiveWeight(1),d.setEffectiveWeight(1),d.reset().crossFadeFrom(c,n)),d.duration=n,e.actions.active=d)}}}}class _e extends ve{constructor(e){super(e)}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,(function(s){s.colorSpace=xe,s.name=a,s.magFilter=i.magFilter||S,s.duplicate=this.duplicate.bind(this,s),i.center&&s.center.copy(i.center),i.repeat&&s.repeat.copy(i.repeat),this.manager.cache[a]=s}).bind(this),void 0,function(s){console.error(`Error: Texture "${i.url}" not found.`)})}catch{console.error(`Error: File "${e}" not found.`)}}duplicate(e){return e=e.clone(),e}}class ze extends Te{constructor(e){super(e),this.listener=new we}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,(function(s){var n=new Me(this.listener);n.name=a,n.setBuffer(s),n.duplicate=this.duplicate.bind(this,n),i.userData&&(n.userData=i.userData,n.userData.loop&&n.setLoop(n.userData.loop),n.userData.volume&&n.setVolume(n.userData.volume)),this.manager.cache[a]=n}).bind(this),function(s){},function(s){console.error(`Error: Audio "${i.url}" not found.`)})}catch{console.error(`Error: File "${e}" not found.`)}}duplicate(e){return console.warn("AudioLoader: Audio cannot be cloned."),e}}class Oe extends Se{constructor(e,t,r){super(e,Ue.bind(t),r),this.cache={},this.assetModelLoader=new Re(this),this.assetTextureLoader=new _e(this),this.assetAudioLoader=new ze(this)}load(e={}){e.models&&this.assetModelLoader.load(e.models),e.textures&&this.assetTextureLoader.load(e.textures),e.audio&&this.assetAudioLoader.load(e.audio)}get(e){var t=this.cache[e];return t}duplicate(e){var t=this.get(e);return t&&(t=t.duplicate()),t}}var Ue=function(o,e,t){var r=Math.ceil(e/t*100);dispatchEvent(new CustomEvent("updateLoading",{detail:{url:o,itemsLoaded:e,itemsTotal:t,percent:r}})),typeof this=="function"&&this(o,e,t)};export{Oe as A,Ee as G,ke as L,O as _,Ce as a,De as b};
