.PHONY : run clean dependencies

dependencies :
	@echo "Installing dependencies"
	pip3 install -r requirements.txt

run :
	@echo "Running backend"
	python3 src/app.py

unit-tests:
	@echo "Running unit tests..."
	@python3 -m unittest discover -s unit -p '*_test.py' -v

clean :
	@echo "Cleaning up database and cache"
	rm -rf src/__pycache__ data