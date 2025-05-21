
{ pkgs }: {
	deps = [
		pkgs.clang
		pkgs.ccls
		pkgs.gdb
		pkgs.gnumake
		pkgs.python3
	];
}
