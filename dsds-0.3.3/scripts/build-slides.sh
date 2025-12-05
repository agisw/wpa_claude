#!/bin/bash
git pull
cd docs/
marp --html --bespoke.progress -o static/slides -I slides
cp -rf slides/images static/slides
