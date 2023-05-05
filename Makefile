.PHONY : all backend frontend

all: dependencies
	make backend&
	make frontend&

dependencies:
	cd backend && make dependencies
	cd frontend && npm install --force

backend:
	cd backend && make run

frontend:
	cd frontend && npm start

clean:
	cd backend && make clean
	cd frontend && rm -rf node_modules