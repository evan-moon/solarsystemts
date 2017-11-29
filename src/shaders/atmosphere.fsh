uniform vec3 glowColor;
varying vec3 vNormal;

void main() {
	float intensity = pow( 0.5 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
