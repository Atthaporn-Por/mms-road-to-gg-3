import pytest

def inc(x):
    return x + 1

def test_answer():
    assert inc(2) == 3
    assert inc(3) == 4
    assert inc(4) == 5
