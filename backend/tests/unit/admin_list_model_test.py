import unittest
from unittest.mock import MagicMock
from flask import jsonify

import sys
sys.path.append('../')
sys.path.append('../src')

from src.admin_list import AdminList
from src.util.database import AdminModel, create_db_tables, SingletonSQLAlchemy
from src.app import app, db


class AdminListModuleTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test environment
        # Create the database tables
        with app.app.app_context():
            create_db_tables(app.app)

    def tearDown(self):
        # Clean up the test environment
        # Drop all the tables from the database
        with app.app.app_context():
            db.drop_all()

    def test_admin_model_creation(self):
        # Test creating an admin entry
        admin = AdminModel(email='admin@example.com', isSuperAdmin=True)
        self.assertEqual(admin.email, 'admin@example.com')
        self.assertEqual(admin.isSuperAdmin, True)

    def test_admin_model_representation(self):
        # Test the string representation of an admin entry
        admin = AdminModel(email='admin@example.com', isSuperAdmin=True)
        expected_repr = "Id:None Email:admin@example.com isSuperAdmin:True"
        self.assertEqual(str(admin), expected_repr)

    def test_admin_model_to_dict(self):
        # Test converting an admin entry to a dictionary
        admin = AdminModel(email='admin@example.com', isSuperAdmin=True)
        expected_dict = {
            'id': None,
            'email': 'admin@example.com',
            'isSuperAdmin': True
        }
        self.assertEqual(admin.to_dict(), expected_dict)

if __name__ == '__main__':
    unittest.main()
