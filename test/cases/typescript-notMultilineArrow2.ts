               if (s & (TypeFlags.Number | TypeFlags.NumberLiteral) && !(s & TypeFlags.EnumLiteral) && (
                    t & TypeFlags.Enum || t & TypeFlags.NumberLiteral && t & TypeFlags.EnumLiteral)) return true;