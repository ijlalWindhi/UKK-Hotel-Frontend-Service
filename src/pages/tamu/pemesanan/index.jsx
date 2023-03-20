import React, { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Input, DatePicker, Alert } from "antd";
import TextPoppins from "../../../components/text/TextPoppins";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  getAllTipeKamar,
  tipeKamarSelectors,
} from "../../../utils/store/reducers/tipeKamarSlice";
import {
  getByTipeKamarAvailable,
  updateKamar,
  kamarSelector,
} from "../../../utils/store/reducers/kamarSlice";
import { addDetailPemesanan } from "../../../utils/store/reducers/detailPemesananSlice";
import { addPemesanan } from "../../../utils/store/reducers/pemesananSlice";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getLocalStorage } from "../../../utils/helper/localStorage";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id_tipe_kamar } = useParams();
  const kamar = useSelector(kamarSelector.selectAll);
  const kamarFilter = kamar.filter(
    (item) => item.id_tipe_kamar == id_tipe_kamar
  );
  const tipeKamar = useSelector((state) =>
    tipeKamarSelectors.selectById(state, id_tipe_kamar)
  );

  const getData = async () => {
    await dispatch(getAllTipeKamar());
    await dispatch(getByTipeKamarAvailable(id_tipe_kamar));
  };

  const submitHandler = async (value) => {
    setLoading(true);
    if (value.jumlah_kamar > kamarFilter.length) {
      setMessage("Jumlah kamar yang tersedia tidak mencukupi");
      setStatus("error");
      setLoading(false);
    } else {
      const user = getLocalStorage(LOCAL_STORAGE_USER);
      const valuesPemesanan = {
        ...value,
        id_tipe_kamar: id_tipe_kamar,
        id_user: user.id_user,
        status_pemesanan: "baru",
        tgl_check_in: new Date(value.tgl_check_in[0]).toISOString(),
        tgl_check_out: new Date(value.tgl_check_in[1]).toISOString(),
      };
      const resPemesanan = await dispatch(addPemesanan(valuesPemesanan));

      for (let i = 0; i < value.jumlah_kamar; i++) {
        const valuesDetailPemesanan = {
          id_pemesanan: resPemesanan.payload.data.id_pemesanan,
          id_kamar: kamarFilter[i].id_kamar,
          tgl_akses: new Date().toISOString(),
          harga: tipeKamar.harga,
        };
        const valueUpdateKamar = {
          check_in: new Date(value.tgl_check_in[0]).toISOString(),
          check_out: new Date(value.tgl_check_in[1]).toISOString(),
        };

        await dispatch(addDetailPemesanan(valuesDetailPemesanan));
        await dispatch(
          updateKamar({ values: valueUpdateKamar, id: kamarFilter[i].id_kamar })
        );
      }

      setMessage("Pemesanan berhasil");
      setStatus("success");
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/tamu/kamar");
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <Heading
        text={`Pemesanan Tipe Kamar ${tipeKamar?.nama_tipe_kamar}`}
        textTransform={"capitalize"}
      />
      <Box my={10} maxW={"100%"}>
        {message && (
          <Alert
            message={message}
            type={status}
            showIcon
            closable
            onClose={() => {
              setMessage(""), setStatus("");
            }}
            style={{ marginBottom: 10 }}
          />
        )}
        <Flex gap={4} flexDir={"column"}>
          <Box>
            <TextPoppins text="Nama Pemesan" />
            <Controller
              name="nama_pemesan"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nama Pemesan"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.nama_pemesan?.type === "required" && (
              <TextPoppins
                text={"Nama pemesan tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Box>
            <TextPoppins text="Email Pemesan" />
            <Controller
              name="email_pemesan"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email Pemesan"
                  style={{ width: "100%" }}
                  type={"email"}
                />
              )}
            />
            {errors.email_pemesan?.type === "required" && (
              <TextPoppins
                text={"Email pemesan tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Box>
            <TextPoppins text="Tanggal Check In dan Check Out" />
            <Controller
              name="tgl_check_in"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  {...field}
                  value={field.value}
                />
              )}
            />
          </Box>
          <Box>
            <TextPoppins text="Nama Tamu" />
            <Controller
              name="nama_tamu"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nama Tamu"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.nama_tamu?.type === "required" && (
              <TextPoppins
                text={"Nama tamu tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Box>
            <TextPoppins text="Jumlah Kamar" />
            <Controller
              name="jumlah_kamar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Jumlah Kamar"
                  style={{ width: "100%" }}
                  type={"number"}
                />
              )}
            />
            {errors.jumlah_kamar?.type === "required" && (
              <TextPoppins
                text={"Jumlah kamar tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Button
            colorScheme={"green"}
            size={"sm"}
            onClick={handleSubmit(async (values) => {
              await submitHandler(values);
            })}
            isLoading={loading}
          >
            <TextPoppins text="Pesan" />
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
