import os
from flask_sqlalchemy import SQLAlchemy


class SingletonSQLAlchemy(SQLAlchemy):
	_instance = None

	def __new__(cls, *args, **kwargs):
		if cls._instance is None:
			basedir = os.path.abspath(os.path.dirname(__file__))
			data_folder = os.path.join(basedir, '../data')
			if not os.path.exists(data_folder):
				os.makedirs(data_folder)

			cls._instance = super(SingletonSQLAlchemy, cls).__new__(cls, *args, **kwargs)

		return cls._instance
