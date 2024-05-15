{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.nodejs
    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
