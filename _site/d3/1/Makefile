STATES = \
	al ak az ar ca co ct de fl ga \
	hi id il in ia ks ky la me md \
	ma mi mn ms mo mt ne nv nh nj \
	nm ny nc nd oh ok or pa ri sc \
	sd tn tx ut vt va wa wv wi wy \
	dc

GENERATED_FILES = \
	state-icons.json

.PHONY: all clean

all: $(GENERATED_FILES)

clean:
	rm -rf -- $(GENERATED_FILES) build

build/%.tar.gz:
	mkdir -p $(dir $@)
	curl 'http://dds.cr.usgs.gov/pub/data/nationalatlas/$(notdir $@)' -o $@

build/states-unfiltered.shp: build/statep010_nt00798.tar.gz
	rm -rf $(basename $@)
	mkdir -p $(basename $@)
	tar -xzm -C $(basename $@) -f $<
	for file in $(basename $@)/*; do chmod 644 $$file; mv $$file $(basename $@).$${file##*.}; done
	rmdir $(basename $@)

# remove duplicate states for water (e.g., Great Lakes)
build/states.shp: build/states-unfiltered.shp geouniq
	@rm -f -- $@ $(basename $@)-unfiltered.json
	ogr2ogr -f 'GeoJSON' $(basename $@)-unfiltered.json $<
	./geouniq STATE_FIPS < $(basename $@)-unfiltered.json > $(basename $@).json
	ogr2ogr -f 'ESRI Shapefile' $@ $(basename $@).json
	rm -f -- $(basename $@).json $(basename $@).json

build/al.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26729' -where "STATE_FIPS = '01'" $@ $<

build/ak.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102006' -where "STATE_FIPS = '02'" $@ $<

build/az.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26748' -where "STATE_FIPS = '04'" $@ $<

build/ar.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26751' -where "STATE_FIPS = '05'" $@ $<

build/ca.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26741' -where "STATE_FIPS = '06'" $@ $<

build/co.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26753' -where "STATE_FIPS = '08'" $@ $<

build/ct.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2234' -where "STATE_FIPS = '09'" $@ $<

build/de.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26757' -where "STATE_FIPS = '10'" $@ $<

build/fl.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26758' -where "STATE_FIPS = '12'" $@ $<

build/ga.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26766' -where "STATE_FIPS = '13'" $@ $<

build/hi.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102007' -where "STATE_FIPS = '15'" $@ $<

build/id.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26768' -where "STATE_FIPS = '16'" $@ $<

build/il.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26771' -where "STATE_FIPS = '17'" $@ $<

build/in.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26773' -where "STATE_FIPS = '18'" $@ $<

build/ia.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26775' -where "STATE_FIPS = '19'" $@ $<

build/ks.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26777' -where "STATE_FIPS = '20'" $@ $<

build/ky.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2798' -where "STATE_FIPS = '21'" $@ $<

build/la.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26781' -where "STATE_FIPS = '22'" $@ $<

build/me.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26783' -where "STATE_FIPS = '23'" $@ $<

build/md.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26785' -where "STATE_FIPS = '24'" $@ $<

build/ma.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26786' -where "STATE_FIPS = '25'" $@ $<

build/mi.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102120' -where "STATE_FIPS = '26'" $@ $<

build/mn.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26791' -where "STATE_FIPS = '27'" $@ $<

build/ms.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26794' -where "STATE_FIPS = '28'" $@ $<

build/mo.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:26796' -where "STATE_FIPS = '29'" $@ $<

build/mt.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32001' -where "STATE_FIPS = '30'" $@ $<

build/ne.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32005' -where "STATE_FIPS = '31'" $@ $<

build/nv.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32007' -where "STATE_FIPS = '32'" $@ $<

build/nh.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32110' -where "STATE_FIPS = '33'" $@ $<

build/nj.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32011' -where "STATE_FIPS = '34'" $@ $<

build/nm.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32012' -where "STATE_FIPS = '35'" $@ $<

build/ny.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32015' -where "STATE_FIPS = '36'" $@ $<

build/nc.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2264' -where "STATE_FIPS = '37'" $@ $<

build/nd.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102720' -where "STATE_FIPS = '38'" $@ $<

build/oh.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32022' -where "STATE_FIPS = '39'" $@ $<

build/ok.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32024' -where "STATE_FIPS = '40'" $@ $<

build/or.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2838' -where "STATE_FIPS = '41'" $@ $<

build/pa.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32028' -where "STATE_FIPS = '42'" $@ $<

build/ri.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32130' -where "STATE_FIPS = '44'" $@ $<

build/sc.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102733' -where "STATE_FIPS = '45'" $@ $<

build/sd.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:102734' -where "STATE_FIPS = '46'" $@ $<

build/tn.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32036' -where "STATE_FIPS = '47'" $@ $<

build/tx.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32037' -where "STATE_FIPS = '48'" $@ $<

build/ut.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32042' -where "STATE_FIPS = '49'" $@ $<

build/vt.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32045' -where "STATE_FIPS = '50'" $@ $<

build/va.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32046' -where "STATE_FIPS = '51'" $@ $<

build/wa.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2855' -where "STATE_FIPS = '53'" $@ $<

build/wv.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32050' -where "STATE_FIPS = '54'" $@ $<

build/wi.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:2859' -where "STATE_FIPS = '55'" $@ $<

build/wy.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:32055' -where "STATE_FIPS = '56'" $@ $<

build/dc.shp: build/states.shp
	rm -f $@ && ogr2ogr -f 'ESRI Shapefile' -t_srs 'EPSG:3785' -where "STATE_FIPS = '11'" $@ $<

build/%.json: build/%.shp
	node_modules/.bin/topojson -o $@ --width=48 --height=48 --simplify=.5 -- icon=$<

state-icons.json: $(addprefix build/,$(addsuffix .json,$(STATES))) merge
	./merge $(filter %.json,$^) > $@
