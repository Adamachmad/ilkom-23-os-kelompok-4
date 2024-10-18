import psutil

# Mengambil informasi penggunaan memori
mem = psutil.virtual_memory()

print(f'Total memory: {mem.total / (1024 ** 2):.2f} MB')
print(f'Available memory: {mem.available / (1024 ** 2):.2f} MB')
print(f'Used memory: {mem.used / (1024 ** 2):.2f} MB')
print(f'Memory percentage: {mem.percent}%')
