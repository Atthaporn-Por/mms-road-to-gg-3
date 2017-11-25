import string
import secrets

class Generator():

    def __init__(self, alphabet=string.ascii_letters + string.digits):
        self.alphabet = alphabet

    def generate(self,length=0):
        # alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(self.alphabet) for i in range(length))
        return password

# if __name__ == '__main__':
#     gen = Generator()
#     token = gen.generate(64)
#     print(token)
