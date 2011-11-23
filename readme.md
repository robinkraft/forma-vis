forma-vis
===================

This project shows the spread of deforestation in Indonesia over the last few years, as detected by [FORMA](http://www.cgdev.org/forma). Use the slider to change the time period. It currently shows monthly data from January 2006 to August 2008. More coming soon!

This project came together thanks to the efforts of Brian Honohan, Hugo Shi, Stephen Mather, and Charles Huang at <a href="http://www.EcoHackNYC.org">EcoHackNYC</a>. Thanks guys for working on this with me!

On the technical side, this project depends heavily on <a href="http://www.vizzuality.com">Vizzuality's</a> awesome <a href="https://github.com/Vizzuality/visualraster">VisualRaster</a> demo, which uses the HTML5 canvas element and a bit of javascript to do pixel-level manipulations. 

Because of the dreaded <a href="http://dira.ro/2011/10/17/heroku-s3-canvas-and-the-security-error-of-doom">cross-domain canvas security restrictions</a>, you can <a href="http://forma-vis.s3-website-us-east-1.amazonaws.com">view the deforestation demo</a> on S3.