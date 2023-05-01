import os
from flask_sqlalchemy import SQLAlchemy

class SingletonSQLAlchemy(SQLAlchemy):
	"""
	This is a singleton class that inherits from SQLAlchemy and provides a single instance of SQLAlchemy for the entire application.
	"""
	_instance = None

	def __new__(cls, *args, **kwargs):
		""" Overriding the __new__ method to create a single instance of SQLAlchemy. """
		if cls._instance is None:
			# Create the data folder if it does not exist
			basedir = os.path.abspath(os.path.dirname(__file__))
			data_folder = os.path.join(basedir, '../../../data')
			if not os.path.exists(data_folder):
				os.makedirs(data_folder)

			# When the instance is None, create a new instance
			cls._instance = super(SingletonSQLAlchemy, cls).__new__(cls, *args, **kwargs)

		return cls._instance
