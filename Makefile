install:
	npm install

develop:
	gulp

release:
	gulp build && gulp compress

clean:
	rm -rf build/ && rm -rf dev/ && rm -f archive.zip

.PHONY: install develop release clean

