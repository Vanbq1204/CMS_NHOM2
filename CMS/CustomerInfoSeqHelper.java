package CMS;

/**
 * Generated from IDL alias "CustomerInfoSeq".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerInfoSeqHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;

	public static void insert (org.omg.CORBA.Any any, CMS.CustomerInfo[] s)
	{
		any.type (type ());
		write (any.create_output_stream (), s);
	}

	public static CMS.CustomerInfo[] extract (final org.omg.CORBA.Any any)
	{
		if ( any.type().kind() == org.omg.CORBA.TCKind.tk_null)
		{
			throw new org.omg.CORBA.BAD_OPERATION ("Can't extract from Any with null type.");
		}
		return read (any.create_input_stream ());
	}

	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerInfoSeqHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_alias_tc(CMS.CustomerInfoSeqHelper.id(), "CustomerInfoSeq",org.omg.CORBA.ORB.init().create_sequence_tc(0, org.omg.CORBA.ORB.init().create_struct_tc(CMS.CustomerInfoHelper.id(),"CustomerInfo",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("customerId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerName", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerEmail", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerPhone", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerAddress", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerStatus", org.omg.CORBA.ORB.init().create_string_tc(0), null)})));
				}
			}
		}
		return _type;
	}

	public static String id()
	{
		return "IDL:CMS/CustomerInfoSeq:1.0";
	}
	public static CMS.CustomerInfo[] read (final org.omg.CORBA.portable.InputStream _in)
	{
		CMS.CustomerInfo[] _result;
		int _l_result0 = _in.read_long();
		try
		{
			 int x = _in.available();
			 if ( x > 0 && _l_result0 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _l_result0);
				}
		}
		catch (java.io.IOException e)
		{
		}
		_result = new CMS.CustomerInfo[_l_result0];
		for (int i=0;i<_result.length;i++)
		{
			_result[i]=CMS.CustomerInfoHelper.read(_in);
		}

		return _result;
	}

	public static void write (final org.omg.CORBA.portable.OutputStream _out, CMS.CustomerInfo[] _s)
	{
		
		_out.write_long(_s.length);
		for (int i=0; i<_s.length;i++)
		{
			CMS.CustomerInfoHelper.write(_out,_s[i]);
		}

	}
}
