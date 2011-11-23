forma-vis
===================

This project shows the spread of deforestation in Indonesia over the last few years, as detected by [FORMA](http://www.cgdev.org/forma). Use the slider to change the time period. It currently shows monthly data from January 2006 to August 2008. FORMA uses MODIS satellite imagery to detect forest clearing across the tropics. More data will be available soon.

This all came together thanks to the efforts of <a href="https://github.com/brianhonohan">Brian Honohan</a>, <a href="https://github.com/hhuuggoo">Hugo Shi</a>, <a href="https://github.com/smathermather">Stephen Mather</a>, and <a href="https://github.com/charleshuang80">Charles Huang</a> at <a href="http://www.EcoHackNYC.org">EcoHackNYC</a>.

On the technical side, this was possible thanks to <a href="http://www.vizzuality.com">Vizzuality's</a> awesome <a href="https://github.com/Vizzuality/visualraster">VisualRaster</a> demo, which uses the HTML5 canvas element and a bit of javascript to do pixel-level manipulations. 

Because of the dreaded <a href="http://dira.ro/2011/10/17/heroku-s3-canvas-and-the-security-error-of-doom">cross-domain canvas security restrictions</a>, you should <a href="http://forma-vis.s3-website-us-east-1.amazonaws.com">view the demo on S3</a>.