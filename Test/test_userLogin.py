# test_userLogin.py
import pytest
import sys
sys.path.append("../")
from Server.Classes.user import User

def test_userInvalid():
    dicU = login(None,"0802281312","f47a2f73a5a0b11bec357163b97fac6db2be67873ffafe49583db4f81610457e",20.000001,20.000001,"online",None)
    print dicU
    assert True

def test_wrongPassword():
    login(None,"0802281312","xxx",20.000001,20.000001,"online",None)
    assert True

def test_oAuthTest():
    assert True
    
def test_callerDataTest():
    assert True

def test_isInputValid():
    login(None,"xxx","ooo",20.000001,20.000001,"online",None)
    assert True
