{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell
{
   
  
  nativeBuildInputs = with pkgs; [
    bun
    python3
  ];

  shellHook = ''
    python -m venv env
    source env/bin/activate
    bun i
  '';


}