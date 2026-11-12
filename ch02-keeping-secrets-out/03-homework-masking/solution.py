# The samples are fake, and they exist only in this exercise.
def mask(value):
    return "****" if len(value) <= 4 else "****" + value[-4:]

samples = ["example-token-not-real", "short", "abc"]
for sample in samples:
    print(mask(sample))
