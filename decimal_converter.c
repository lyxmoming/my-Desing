#include <stdio.h>
#include <stdlib.h>

char* decimal_to_base(int decimal, int base) {
    if (base < 2 || base > 36) {
        return NULL;
    }

    int size = 32;
    char* result = (char*)malloc(size * sizeof(char));
    if (!result) {
        return NULL;
    }

    int index = 0;
    int is_negative = 0;

    if (decimal == 0) {
        result[0] = '0';
        result[1] = '\0';
        return result;
    }

    if (decimal < 0) {
        is_negative = 1;
        decimal = -decimal;
    }

    char digits[] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (decimal > 0) {
        if (index >= size - 2) {
            size *= 2;
            char* temp = (char*)realloc(result, size * sizeof(char));
            if (!temp) {
                free(result);
                return NULL;
            }
            result = temp;
        }
        result[index++] = digits[decimal % base];
        decimal /= base;
    }

    if (is_negative) {
        result[index++] = '-';
    }

    result[index] = '\0';

    for (int i = 0; i < index / 2; i++) {
        char temp = result[i];
        result[i] = result[index - 1 - i];
        result[index - 1 - i] = temp;
    }

    return result;
}

int main() {
    int decimal, base;
    
    printf("输入十进制数: ");
    scanf("%d", &decimal);
    
    printf("输入目标进制 (2-36): ");
    scanf("%d", &base);
    
    char* result = decimal_to_base(decimal, base);
    
    if (result) {
        printf("转换结果: %s\n", result);
        free(result);
    } else {
        printf("无效的进制数\n");
    }
    
    return 0;
}
