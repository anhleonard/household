import { Col, Input, Row, Select, RefSelectProps, InputRef } from 'antd';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Address } from '../../types/address.interface';
import { Commune, District } from '../../types/local.interface';
import { State } from '../../types/state.interface';
import { removeVietnameseTones } from '../../utils/vietnamese.util';

interface AddressInputProps {
    value?: Address;
    onChange?: (newValue: Address) => void;
}

interface ProvinceOption {
    value: number;
    label: string;
    districts: District[];
}

interface DistrictOption {
    value: number;
    label: string;
    communes: Commune[];
}

interface CommuneOption {
    value: number;
    label: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({ value, onChange }) => {
    const locals = useSelector((state: State) => state.config?.locals || []);

    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
    const [selectedCommune, setSelectedCommune] = useState<number | null>(null);
    const [inputtedStreet, setInputtedStreet] = useState<string | undefined>(undefined);
    const [districts, setDistricts] = useState<District[]>([]);
    const [communes, setCommunes] = useState<Commune[]>([]);

    const districtSelect = useRef<RefSelectProps>();
    const communeSelect = useRef<RefSelectProps>();
    const streetInput = useRef<InputRef>();

    const provinceOptions: ProvinceOption[] = useMemo(() => {
        return locals.map((e) => ({
            value: e.id,
            label: e.name,
            districts: e.districts,
        }));
    }, [locals]);

    const districtOptions: DistrictOption[] = useMemo(() => {
        return districts.map((e) => ({
            value: e.id,
            label: e.name,
            communes: e.communes,
        }));
    }, [districts]);

    const communeOptions: CommuneOption[] = useMemo(() => {
        return communes.map((e) => ({
            value: e.id,
            label: e.name,
        }));
    }, [communes]);

    useEffect(() => {
        search: for (const province of locals) {
            for (const district of province.districts) {
                for (const commune of district.communes) {
                    if (commune.id === value?.communeId) {
                        setDistricts(province.districts);
                        setCommunes(district.communes);

                        setSelectedProvince(province.id);
                        setSelectedDistrict(district.id);
                        setSelectedCommune(commune.id);

                        break search;
                    }
                }
            }
        }
        setInputtedStreet(value?.street || undefined);
    }, [value]);

    const handleOptionSearch = (search: string, option: any) => {
        return removeVietnameseTones(option.label).toLowerCase().includes(removeVietnameseTones(search).toLowerCase());
    };

    const handleSelectProvince = (value: number, option: ProvinceOption) => {
        setSelectedProvince(value);
        setDistricts(option.districts);
        setSelectedDistrict(null);
        setSelectedCommune(null);
        setInputtedStreet(undefined);
        districtSelect.current?.focus();
    };

    const handleSelectDistrict = (value: number, option: DistrictOption) => {
        setSelectedDistrict(value);
        setCommunes(option.communes);
        setSelectedCommune(null);
        setInputtedStreet(undefined);
        communeSelect.current?.focus();
    };

    const handleSelectCommune = (communeId: number) => {
        setSelectedCommune(communeId);
        setInputtedStreet(undefined);
        onChange?.({
            communeId,
            street: undefined,
        } as Address);
        streetInput.current?.focus();
    };

    const handleInputStreet = (street: string) => {
        setInputtedStreet(street);
        onChange?.({
            ...value,
            street,
        } as Address);
    };

    return (
        <>
            <Row style={{ gap: 12 }}>
                <Col flex="1 1 30%">
                    <Select
                        placeholder="Chọn tỉnh/thành phố"
                        value={selectedProvince}
                        options={provinceOptions}
                        optionLabelProp="label"
                        dropdownMatchSelectWidth={200}
                        showSearch
                        filterOption={handleOptionSearch}
                        onSelect={handleSelectProvince}
                    />
                </Col>
                <Col flex="1 1 30%">
                    <Select
                        placeholder="Chọn quận/huyện"
                        ref={districtSelect as any}
                        value={selectedDistrict}
                        options={districtOptions}
                        optionLabelProp="label"
                        showSearch
                        filterOption={handleOptionSearch}
                        onSelect={handleSelectDistrict}
                        dropdownMatchSelectWidth={200}
                        showAction={['click', 'focus']}
                    />
                </Col>
                <Col flex="1 1 30%">
                    <Select
                        placeholder="Chọn phường/xã"
                        ref={communeSelect as any}
                        value={selectedCommune}
                        options={communeOptions}
                        optionLabelProp="label"
                        showSearch
                        filterOption={handleOptionSearch}
                        onSelect={handleSelectCommune}
                        dropdownMatchSelectWidth={200}
                        showAction={['click', 'focus']}
                    />
                </Col>
                <Col flex="1 1 30%">
                    <Input
                        placeholder="Nhập số nhà, tên đường"
                        ref={streetInput as any}
                        value={inputtedStreet}
                        onChange={(e) => handleInputStreet(e.target.value)}
                    />
                </Col>
            </Row>
        </>
    );
};
