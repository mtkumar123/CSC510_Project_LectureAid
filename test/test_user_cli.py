"""

Unit tests for user_cli

"""
import unittest
from io import StringIO
import sys
from code.user_cli import menu_display
import pyfiglet
import shutil


class TestExtractSizes(unittest.TestCase):
    def test1(self):
        format_welcome_message = pyfiglet.figlet_format("LECTURE AID")
        size = shutil.get_terminal_size(fallback=(120, 50))
        expected = format_welcome_message.center(size.columns) + """Welcome to Lecture Aid. Choose from the following options:
Option 1: Press 1 to enter the file location you would like Lecture Aid to help you find resources on.
Option 2: Press 2
Press Q to quit the program.\n
"""

        capturedOutput = StringIO()  # Create StringIO object
        sys.stdout = capturedOutput  # and redirect stdout.
        menu_display()
        sys.stdout = sys.__stdout__  # Reset redirect.
        self.assertEqual(capturedOutput.getvalue(), expected)
