forma-vis
===================
<a href="http://forma-vis.s3-website-us-east-1.amazonaws.com/">Demo here</a>

This demo shows the spread of deforestation in Indonesia over the last few years, as detected by [FORMA](http://www.cgdev.org/forma). Use the slider on the <a href="http://forma-vis.s3-website-us-east-1.amazonaws.com/">website</a> to change the time period. It currently shows monthly data from January 2006 to August 2011. Green represents forest cover as of the year 2000, brown pixels are clearing between 2000 and 2005 (<a href="http://globalmonitoring.sdstate.edu/projects/gfm/humidtropics/data.html">Hansen et al. 2008</a>), and subsequent clearing appears in red. FORMA uses MODIS satellite imagery to detect forest clearing across the tropics. More data will be available soon.

The page came together thanks to the efforts of <a href="https://github.com/brianhonohan">Brian Honohan</a>, <a href="https://github.com/hhuuggoo">Hugo Shi</a>, <a href="https://github.com/smathermather">Stephen Mather</a>, and <a href="https://github.com/charleshuang80">Charles Huang</a> at <a href="http://www.EcoHackNYC.org">EcoHackNYC</a>.

On the technical side, this was possible thanks to <a href="http://www.vizzuality.com">Vizzuality's</a> awesome <a href="https://github.com/Vizzuality/visualraster">VisualRaster</a> demo, which uses the HTML5 canvas element and a bit of javascript to do pixel-level manipulations. 
