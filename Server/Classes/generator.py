import string
import secrets

class Generator():

    def __init__(self, alphabet=string.ascii_letters + string.digits):
        self.alphabet = alphabet

    def generate_token(self):
        password = ''.join(secrets.choice(self.alphabet) for i in range(255))
        return password

